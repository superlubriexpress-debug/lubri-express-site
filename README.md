# Lubri Express Auto Center

Site premium da Lubri Express Auto Center, migrado do Lovable para uma base compatível com v0, Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui e Vercel.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion
- Vercel

## Estrutura

- `app/`: rotas, metadata, sitemap e robots.
- `components/`: componentes do site, UI, booking e animações.
- `components/ui/`: componentes base compatíveis com shadcn/ui.
- `components/sections/`: seções da home.
- `lib/`: dados, utilitários e schemas SEO.
- `hooks/`: hooks reutilizáveis.
- `styles/`: estilos da identidade visual.
- `public/assets/`: imagens e marca.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Variáveis de ambiente

Crie `.env.local` com:

```bash
NEXT_PUBLIC_SITE_URL=https://lubriexpress.vercel.app
```

Quando o domínio oficial estiver pronto, altere para o domínio final.

## Rotas

- `/`: site principal.
- `/site`: rota de prévia, marcada como `noindex`.
- `/painel`: placeholder da área administrativa.

## Deploy atual

Preview/produção de teste:

https://lubriexpress.vercel.app

## Observações

O projeto preserva a identidade Lubri Express: preto `#111111`, branco `#FFFFFF` e amarelo `#FFC400`.

O código foi organizado para continuar evoluindo no v0 sem recriar o site do zero.
