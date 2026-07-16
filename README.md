# Lubri Express Auto Center

Site oficial da Lubri Express Auto Center, organizado em uma base moderna com Next.js, React, TypeScript e Tailwind CSS.

Responsavel tecnico: Gean Maikon.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion

## Estrutura

- `app/`: rotas, metadata, sitemap e robots.
- `components/`: componentes do site, UI, agendamento e animacoes.
- `components/ui/`: componentes base reutilizaveis.
- `components/sections/`: secoes da pagina.
- `lib/`: dados, utilitarios e schemas SEO.
- `hooks/`: hooks reutilizaveis.
- `styles/`: estilos da identidade visual.
- `public/assets/`: imagens reais, marca e serviços.
- `public/brands/`: logos oficiais de fabricantes usadas na seção de marcas.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Variaveis de ambiente

Crie `.env.local` com:

```bash
NEXT_PUBLIC_SITE_URL=https://lubriexpress.com.br
```

## Rotas

- `/`: site principal.
- `/site`: rota de previa, marcada como `noindex`.

## Identidade

O projeto preserva a identidade Lubri Express: preto `#111111`, branco `#FFFFFF` e amarelo `#FFC400`.
