# Cloud Stack — Next.js Blog

A production-ready Next.js 14 blog site for Azure & Microsoft Cloud content.

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono (code/mono)
- **Images**: Next.js Image with remote patterns
- **Language**: TypeScript

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Build for production

```bash
npm run build
npm start
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + CSS variables
│   ├── not-found.tsx       # 404 page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post
│   ├── events/
│   │   └── page.tsx
│   ├── tools/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
├── components/
│   ├── Nav.tsx             # Sticky nav with mobile hamburger
│   ├── Footer.tsx
│   └── PostCard.tsx        # Reusable post card (featured + compact)
└── data/
    └── content.ts          # Sample posts, events (replace with your CMS/DB)
```

---

## Customising content

### Posts & events
Edit `src/data/content.ts` to update blog posts and events. Each post has:
- `slug` — URL path (`/blog/your-slug`)
- `title`, `excerpt`, `date`, `readTime`
- `tags` — array of tag strings
- `image` — URL (Unsplash placeholders used by default)

### Your details
Update the following with your own info:
- Name/brand in `src/components/Nav.tsx` and `src/components/Footer.tsx`
- Author photo URL in `src/app/page.tsx` and `src/app/about/page.tsx`
- Stats (articles, readers) in `src/app/page.tsx` and `src/app/about/page.tsx`
- Social links in `src/components/Footer.tsx`

### Colours
The primary colour is Azure blue (`#0062f5`). To change it, search for `#0062f5` and `rgba(0,98,245` across the project and replace with your brand colour.

---

## Adding a CMS

The sample data in `src/data/content.ts` is a placeholder. For a real blog you can swap it for:

- **Contentful / Sanity / Hygraph** — fetch posts server-side in page components
- **MDX files** — add `@next/mdx` and store posts as `.mdx` in `/content/posts`
- **Supabase** — store posts in a Postgres table and query via the Supabase JS client

---

## Deployment

This site deploys to Vercel with zero configuration:

```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments on push.

---

## License

MIT — use freely, attribution appreciated.
