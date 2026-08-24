# TAJO Digital 3F — Site (estrutura separada)

Site dividido em arquivos para facilitar a edição. **Basta abrir o `index.html` no navegador** — tudo já está ligado (sincronizado) automaticamente.

## Estrutura de pastas

```
tajo-site/
├── index.html          → a página (HTML). Só texto/estrutura.
├── style.css           → todo o estilo (cores, layout, animações).
├── script.js           → todo o comportamento (menu, modal, formulário, orçamento, scroll).
└── assets/
    └── images/
        ├── logo.webp        → LOGOMARCA (usada no topo, favicon, rodapé e capas)
        ├── founder.webp     → FOTO DO FUNDADOR (seção Quem Somos)
        └── portfolio/
            ├── 1.webp       → Portfólio: Identidade visual
            ├── 2.webp       → Portfólio: Conteúdo para redes sociais
            ├── 3.webp       → Portfólio: Campanhas comerciais
            ├── 4.webp       → Portfólio: Vídeos publicitários com IA
            └── 5.webp       → Portfólio: Modelos virtuais para campanhas
```

## Como trocar as imagens (o que você pediu)

Basta **substituir o arquivo** pelo mesmo nome e mesmo formato (WebP). Não precisa mexer no HTML.

| O que você quer trocar | Onde colocar | Formato | Tamanho sugerido |
|---|---|---|---|
| **Logomarca** | `assets/images/logo.webp` | WebP | quadrada, ~1080×1080 (transparente) |
| **Foto do fundador** | `assets/images/founder.webp` | WebP | retrato, ~900×1200 (4:5) |
| **Portfólio 1 — Identidade visual** | `assets/images/portfolio/1.webp` | WebP | ~1200×900 (4:3) |
| **Portfólio 2 — Redes sociais** | `assets/images/portfolio/2.webp` | WebP | ~1200×900 |
| **Portfólio 3 — Campanhas** | `assets/images/portfolio/3.webp` | WebP | ~1200×900 |
| **Portfólio 4 — Vídeos IA** | `assets/images/portfolio/4.webp` | WebP | ~1200×900 |
| **Portfólio 5 — Modelos virtuais** | `assets/images/portfolio/5.webp` | WebP | ~1200×900 |

> Dica: se sua imagem estiver em `.png` ou `.jpg`, pode salvar no mesmo nome com `.webp`. Se preferir deixar em `.png`, troque a extensão **dentro do `index.html`** no `<img src="...">` correspondente (ex.: `portfolio/1.png`). Por isso cada imagem tem um `<img>` único — a edição é isolada.

## Notas

- **Imagens do portfólio** estão com uma "arte de amostra" (placeholder) até você colocar os projetos reais — assim o site já mostra o layout funcionando.
- **Preços, WhatsApp, Instagram e textos** estão no `index.html` (não no CSS/JS). Para editar o número do WhatsApp, procure por `99963` no `index.html` ou no `script.js`.
- **Estilo visual** (cores, tamanhos, fontes) fica todo no `style.css`.
- Se quiser que alguma imagem seja usada em mais de um lugar (ex.: mesma arte em 2 portfólios), basta apontar os dois `<img>` para o mesmo arquivo.

## Rodar

Abra `index.html` direto no navegador (duplo clique). Nada de servidor é necessário.