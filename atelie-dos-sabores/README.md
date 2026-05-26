# Ateliê dos Sabores — Landing Page

Landing page para encomenda de salgados artesanais, brigadeiros gourmet e kit festa em Joinville, SC.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **Axios** — cliente HTTP para integração com API de orçamentos
- **CSS Modules** — escopo por componente, sem Bootstrap
- **CSS customizado** — grid/flex nativo, design tokens via `var()`

## Estrutura

```
src/
├── components/
│   ├── Hero/                  # Seção principal com parallax
│   ├── SalgadosSection/       # Grid de salgados com cards
│   ├── BrigadeiroSection/     # Brigadeiros em tema escuro
│   ├── KitFestaSection/       # Formulário de orçamento + Axios
│   ├── Localizacao/           # Mapa + diferenciais
│   ├── Footer/                # Rodapé
│   └── WhatsAppButton/        # Botão flutuante
├── hooks/
│   ├── useReveal.ts           # IntersectionObserver para animações
│   └── useScrollParallax.ts   # Efeito parallax por scroll
├── services/
│   └── api.ts                 # Instância Axios + solicitarOrcamento()
└── styles/
    └── global.css             # Tokens, reset, utilitários
```

## Setup

```bash
npm install
npm run dev
```

### Variáveis de ambiente

Crie um `.env` na raiz:

```env
VITE_API_URL=https://api.ateliedossabores.com.br/v1
VITE_API_TOKEN=seu_token_aqui   # opcional
```

### Fonte customizada

Coloque o arquivo `SparklPassion.otf` em `/public/fonts/`.  
Sem ele, os headings usam `cursive` como fallback.

### Número de WhatsApp

Substitua `5547999999999` pelo número real em:
- `src/components/Hero/index.tsx`
- `src/components/SalgadosSection/index.tsx`
- `src/components/BrigadeiroSection/index.tsx`
- `src/components/KitFestaSection/index.tsx`
- `src/components/Localizacao/index.tsx`
- `src/components/Footer/index.tsx`
- `src/components/WhatsAppButton/index.tsx`

## Build

```bash
npm run build
# dist/ pronto para deploy (Vercel, Netlify, etc.)
```
