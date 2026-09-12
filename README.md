# TAJO Digital 3F — Site institucional + Comunidade

Versão profissional do site da TAJO Digital 3F, criada em HTML, CSS e JavaScript com backend Flask + SQLite apenas para os recursos que realmente precisam de servidor.

## O que esta versão inclui

- identidade clara e profissional por padrão;
- tema escuro opcional, salvo no navegador;
- apresentação completa dos serviços atuais da TAJO;
- filtros de serviços;
- planos de conteúdo;
- portfólio;
- formulário que abre o WhatsApp com briefing organizado;
- SEO técnico, Schema.org, Open Graph, robots.txt e sitemap.xml;
- responsividade para celular, tablet e desktop;
- acessibilidade básica e suporte a `prefers-reduced-motion`;
- contador real de pessoas online;
- comunidade com mensagens públicas;
- proteção contra HTML/XSS no front-end;
- limite de tamanho, cooldown e validação das mensagens no backend;
- moderação por endpoint protegido com `ADMIN_KEY`.

## Rodar localmente

### 1. Instalar Python 3.10+

No Windows, marque a opção **Add Python to PATH** durante a instalação.

### 2. Criar ambiente virtual

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Iniciar

```bash
python app.py
```

Abra:

```text
http://127.0.0.1:5000
```

> Se você abrir apenas o `index.html` com duplo clique, o design, tema, filtros e WhatsApp funcionam. O contador de pessoas online e a comunidade precisam do `app.py` rodando.

## Banco de dados

O arquivo é criado automaticamente em:

```text
data/community.db
```

Use `DATABASE_PATH` para alterar esse local em produção.

## Domínio configurado

O site já usa como endereço principal:

```text
http://tajodigital3f.com.br/
```

Esse domínio está presente em canonical, Open Graph, Schema.org, sitemap, robots e variável `SITE_URL` de exemplo.

**Importante:** o código não consegue alterar o DNS do Registro.br sozinho. Depois de publicar o Flask em uma hospedagem compatível, aponte o domínio `tajodigital3f.com.br` para o endereço informado pela hospedagem. Quando o certificado SSL estiver ativo, troque as referências de `http://` para `https://` para ficar com a configuração ideal de produção.

## Produção

A comunidade usa Flask + SQLite, então publique em uma hospedagem que mantenha o processo Python e tenha armazenamento persistente. Exemplos: VPS, Railway, Render com disco persistente ou hospedagem Python equivalente.

Início recomendado em produção:

```bash
gunicorn -w 2 -b 0.0.0.0:$PORT app:app
```

### Variáveis de ambiente

Copie `.env.example` como referência e configure as variáveis no painel da hospedagem:

- `SITE_URL`
- `DATABASE_PATH`
- `ADMIN_KEY`
- `HASH_SALT`
- `PORT`

Não publique sua `ADMIN_KEY` real no GitHub.

## Moderação

Para apagar uma mensagem, envie uma requisição `DELETE` para:

```text
/api/community/messages/ID
```

com o cabeçalho:

```text
X-Admin-Key: SUA_CHAVE
```

## Estrutura

```text
/
├── index.html
├── style.css
├── script.js
├── app.py
├── requirements.txt
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
