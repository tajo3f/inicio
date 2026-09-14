# TAJO Digital 3F — Site 2026

Site institucional/comercial da TAJO Digital 3F, com HTML5, CSS3, JavaScript Vanilla e Flask apenas para a comunidade/presença online. A versão foi preparada para ser simples de manter, rápida e compatível com a detecção automática de Flask do Vercel.

## Destaques desta versão

- nova área **TAJO Prompt Studio 3.0 Beta**;
- CTA para a página oficial de vendas;
- CTA oficial para afiliação na Hotmart;
- CTA para o grupo oficial de vendedores no WhatsApp;
- preview interativo do Prompt Studio;
- área comercial de **Visualizers** com planos de R$ 89, R$ 179 e R$ 449;
- plano de R$ 179 destacado como opção de melhor equilíbrio;
- UI/UX refinado, tema claro/escuro e microinterações;
- scroll personalizado e indicador de progresso;
- botão voltar ao topo;
- efeitos de spotlight e ripple sem dependências externas pesadas;
- filtros de serviços, planos, portfólio, comunidade e formulário via WhatsApp;
- SEO técnico, Schema.org, Open Graph, sitemap, robots e manifest;
- layout mobile-first e acessibilidade com `prefers-reduced-motion`;
- headers de segurança e validações no backend;
- pasta `public/` com os assets estáticos para o CDN do Vercel.

## Links comerciais configurados

- Página de vendas: https://tajopromptstudio.vercel.app/
- Afiliação Hotmart: https://affiliate.hotmart.com/affiliate-recruiting/view/3363T107484199
- Grupo oficial de vendedores: https://chat.whatsapp.com/L1pNnZviFMaJixYO1tDHlQ?s=cl&p=i&mlu=4&ilr=4

## Rodar localmente

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Abra `http://127.0.0.1:5000`.

## Publicar no Vercel

1. Suba esta pasta em um repositório GitHub.
2. No Vercel, clique em **Add New > Project** e importe o repositório.
3. O Vercel detecta automaticamente o `app.py` com a instância Flask chamada `app`; não é necessário criar Build Command nem Output Directory.
4. Em **Environment Variables**, você pode definir `SITE_URL=https://tajodigital3f.com.br/` e `ADMIN_KEY` se for usar a moderação da comunidade.
5. Faça o deploy.

### Observação sobre a comunidade no Vercel

O Vercel usa funções serverless e não oferece disco SQLite persistente. Nesta versão, quando a variável `VERCEL` estiver presente, o banco usa `/tmp/tajo-community.db` para evitar erro de gravação. Isso mantém o recurso funcional durante a vida da instância, mas as mensagens podem reiniciar em novos cold starts. Para comunidade realmente persistente, conecte depois um banco externo (ex.: PostgreSQL/Supabase) ou hospede o Flask em ambiente com disco persistente.

## Estrutura

```text
/
├── index.html
├── style.css
├── script.js
├── app.py
├── requirements.txt
├── .python-version
├── .vercelignore
├── public/
├── Procfile
├── .env.example
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── logo.png
├── logo.webp
├── favicon.png
├── founder.webp
└── 1.webp ... 5.webp
```

## Edição rápida

- **Prompt Studio:** procure por `id="prompt-studio"` em `index.html`.
- **Visualizers:** procure por `id="visualizers"`.
- **Cores:** altere as variáveis no início de `style.css`.
- **WhatsApp de orçamento:** procure por `5527999639610`.
- **Links de afiliados:** estão concentrados na seção Prompt Studio e no footer.

## Segurança

Não publique `ADMIN_KEY` real no GitHub. Use variáveis de ambiente no painel da hospedagem.
