// ==========================================
// TAJO DIGITAL 3F - SCRIPTS CORPORATIVOS 2026
// ==========================================

// 1. CONTROLE DO MENU MOBILE (HAMBÚRGUER)
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fecha o menu mobile automaticamente ao clicar em qualquer link dele
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

// 2. CONTROLE DO MOTO ESCURO / CLARO (DARK MODE)
const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
const themeToggleIconMobile = document.getElementById('theme-toggle-icon-mobile');

function toggleDarkMode() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        if (themeToggleIcon) themeToggleIcon.className = 'fas fa-sun text-amber-500';
        if (themeToggleIconMobile) themeToggleIconMobile.className = 'fas fa-sun text-amber-500';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        if (themeToggleIcon) themeToggleIcon.className = 'fas fa-moon';
        if (themeToggleIconMobile) themeToggleIconMobile.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleDarkMode);
if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleDarkMode);

// Verificação inicial de preferência salva pelo usuário
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
    htmlElement.classList.add('light');
    if (themeToggleIcon) themeToggleIcon.className = 'fas fa-sun text-amber-500';
    if (themeToggleIconMobile) themeToggleIconMobile.className = 'fas fa-sun text-amber-500';
}

// 3. SISTEMA DE ACORDION DO FAQ (PERGUNTAS FREQUENTES)
const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        
        // Fecha outros itens do FAQ que porventura estejam abertos (Efeito Sanfona)
        document.querySelectorAll('.faq-content').forEach(el => {
            if (el !== content) el.style.maxHeight = null;
        });
        document.querySelectorAll('.faq-btn i').forEach(i => {
            if (i !== icon) i.classList.remove('rotate-180');
        });

        // Abre ou fecha o item atual clicado
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate-180');
        }
    });
});
