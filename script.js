(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const root = document.documentElement;
  const themeMeta = $('#themeColorMeta');
  const themeToggle = $('#themeToggle');
  const siteHeader = $('#siteHeader');
  const scrollProgress = $('#scrollProgress');
  const menuButton = $('#menuButton');
  const navLinks = $('#navLinks');

  function applyTheme(theme) {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    if (themeMeta) themeMeta.setAttribute('content', next === 'dark' ? '#07101d' : '#f6f9ff');
    if (themeToggle) themeToggle.setAttribute('aria-label', next === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    try { localStorage.setItem('tajo-theme', next); } catch (_) {}
  }

  applyTheme(root.dataset.theme || 'light');
  themeToggle?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const updateScrollUI = () => {
    const y = window.scrollY || 0;
    siteHeader?.classList.toggle('scrolled', y > 12);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgress) scrollProgress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  menuButton?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  });
  $$('#navLinks a').forEach(link => link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', event => {
    if (!navLinks?.classList.contains('open')) return;
    if (!navLinks.contains(event.target) && !menuButton?.contains(event.target)) {
      navLinks.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 })
    : null;
  $$('.reveal').forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('visible'));

  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('#navLinks a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-38% 0px -52% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }

  $$('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      $$('.filter-button').forEach(btn => btn.classList.toggle('active', btn === button));
      $$('.service-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  const serviceSelect = $('#serviceSelect');
  $$('.service-link').forEach(link => {
    link.addEventListener('click', () => {
      const service = link.dataset.service;
      if (!service || !serviceSelect) return;
      const existing = Array.from(serviceSelect.options).find(option => option.textContent.trim().toLowerCase() === service.trim().toLowerCase());
      if (existing) serviceSelect.value = existing.value;
      else {
        serviceSelect.value = 'Outro';
        const message = $('#quoteForm textarea[name="mensagem"]');
        if (message && !message.value) message.value = `Tenho interesse em: ${service}. `;
      }
    });
  });

  $('#quoteForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      'Olá! Vim pelo site da TAJO Digital 3F e gostaria de solicitar um orçamento.',
      '',
      `Nome: ${data.get('nome') || '-'}`,
      `Empresa: ${data.get('empresa') || '-'}`,
      `WhatsApp: ${data.get('whatsapp') || '-'}`,
      `Serviço: ${data.get('servico') || '-'}`,
      `Necessidade: ${data.get('mensagem') || '-'}`
    ].join('\n');
    window.open(`https://wa.me/5527999639610?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  const currentYear = $('#currentYear');
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  // Comunidade / presença online
  const communityForm = $('#communityForm');
  const nameInput = $('#communityName');
  const messageInput = $('#communityMessage');
  const submitButton = $('#communitySubmit');
  const messagesBox = $('#communityMessages');
  const emptyState = $('#communityEmpty');
  const connectionLabel = $('#communityConnection');
  const feedback = $('#communityFeedback');
  const onlineCount = $('#onlineCount');
  const presenceStatus = $('#presenceStatus');
  const messageCounter = $('#messageCounter');

  let communityAvailable = false;
  let lastMessageId = 0;

  function getSessionId() {
    try {
      let value = localStorage.getItem('tajo-community-session');
      if (!value) {
        value = (window.crypto?.randomUUID?.() || `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`).replace(/[^a-zA-Z0-9_-]/g, '');
        localStorage.setItem('tajo-community-session', value);
      }
      return value;
    } catch (_) {
      return `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }
  }

  const sessionId = getSessionId();
  try {
    const savedName = localStorage.getItem('tajo-community-name');
    if (savedName && nameInput) nameInput.value = savedName;
  } catch (_) {}

  const setCommunityState = (available, message) => {
    communityAvailable = available;
    if (connectionLabel) connectionLabel.textContent = message;
    if (submitButton) submitButton.disabled = !available;
    if (!available && messagesBox && emptyState) {
      emptyState.textContent = 'Comunidade indisponível neste modo. Execute o site pelo servidor Flask para ativar pessoas online e mensagens.';
    }
  };

  async function api(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    try {
      const response = await fetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        signal: controller.signal
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Não foi possível concluir a solicitação.');
      return payload;
    } finally {
      clearTimeout(timer);
    }
  }

  async function heartbeat() {
    try {
      const data = await api('/api/presence', { method: 'POST', body: JSON.stringify({ session_id: sessionId }) });
      setCommunityState(true, 'Servidor conectado');
      if (onlineCount) onlineCount.textContent = `${data.online} ${data.online === 1 ? 'pessoa online' : 'pessoas online'}`;
      if (presenceStatus) presenceStatus.textContent = 'Ativas nos últimos 45 segundos';
    } catch (_) {
      setCommunityState(false, 'Servidor da comunidade offline');
      if (onlineCount) onlineCount.textContent = 'Comunidade offline';
      if (presenceStatus) presenceStatus.textContent = 'Abra pelo app.py para ativar';
    }
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  function renderMessages(messages) {
    if (!messagesBox) return;
    const shouldStickToBottom = messagesBox.scrollHeight - messagesBox.scrollTop - messagesBox.clientHeight < 90;
    messagesBox.innerHTML = '';
    if (!messages.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Ainda não há mensagens. Seja a primeira pessoa a iniciar uma conversa.';
      messagesBox.appendChild(empty);
      return;
    }
    messages.forEach(item => {
      const article = document.createElement('article');
      article.className = `message${item.session_id === sessionId ? ' mine' : ''}`;
      article.dataset.messageId = String(item.id);

      const top = document.createElement('div');
      top.className = 'message-top';
      const author = document.createElement('strong');
      author.textContent = item.name;
      const time = document.createElement('time');
      time.dateTime = item.created_at;
      time.textContent = formatDate(item.created_at);
      top.append(author, time);

      const body = document.createElement('p');
      body.textContent = item.message;
      article.append(top, body);
      messagesBox.appendChild(article);
      lastMessageId = Math.max(lastMessageId, Number(item.id) || 0);
    });
    if (shouldStickToBottom || lastMessageId === 0) messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  async function loadMessages() {
    if (!communityAvailable) return;
    try {
      const data = await api('/api/community/messages?limit=50');
      renderMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch (error) {
      setCommunityState(false, 'Conexão perdida');
      if (feedback) {
        feedback.textContent = error.message;
        feedback.className = 'form-feedback error';
      }
    }
  }

  messageInput?.addEventListener('input', () => {
    if (messageCounter) messageCounter.textContent = String(messageInput.value.length);
  });

  communityForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!communityAvailable) return;
    const name = nameInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';
    if (feedback) { feedback.textContent = ''; feedback.className = 'form-feedback'; }
    if (name.length < 2 || message.length < 2) {
      if (feedback) { feedback.textContent = 'Preencha seu nome e uma mensagem com pelo menos 2 caracteres.'; feedback.className = 'form-feedback error'; }
      return;
    }
    submitButton.disabled = true;
    submitButton.textContent = 'Publicando…';
    try {
      await api('/api/community/messages', { method: 'POST', body: JSON.stringify({ session_id: sessionId, name, message }) });
      try { localStorage.setItem('tajo-community-name', name); } catch (_) {}
      if (messageInput) messageInput.value = '';
      if (messageCounter) messageCounter.textContent = '0';
      if (feedback) { feedback.textContent = 'Mensagem publicada.'; feedback.className = 'form-feedback success'; }
      await loadMessages();
    } catch (error) {
      if (feedback) { feedback.textContent = error.message; feedback.className = 'form-feedback error'; }
    } finally {
      submitButton.disabled = !communityAvailable;
      submitButton.textContent = 'Publicar ideia';
    }
  });

  async function startCommunity() {
    await heartbeat();
    if (communityAvailable) await loadMessages();
    window.setInterval(heartbeat, 20000);
    window.setInterval(loadMessages, 6000);
  }

  startCommunity();
})();
