import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FALLBACK_BLOGS = [
  {
    id: 24,
    title: 'Depth or Breadth',
    summary: 'An architectural and engineering reflection on specialized technical depth versus multi-disciplinary breadth when designing modern distributed systems, developer tooling, and autonomous agent systems.',
  },
  {
    id: 23,
    title: 'Good Agent Bad Agent',
    summary: 'Critical feedback and field observations evaluating modern autonomous AI coding agents including Kiro, Jules, and Antigravity. Why preserving frontier reasoning quality with explicit rate limits creates vastly more developer trust than degrading free tiers.',
  },
  {
    id: 21,
    title: 'What Actually Kills You ? Voltage or Current',
    summary: 'Debunking common misconceptions in electrical physics and electrocution dynamics. Explaining Ohm\'s law, physiological electrical resistance, ventricular fibrillation thresholds, and why current represents the bullet while voltage represents the gunpowder.',
  },
  {
    id: 18,
    title: 'Building a Production-Grade Monorepo: Next.js 15, Svelte 5, and Turborepo',
    summary: 'In-depth walkthrough of architecting high-performance polyglot frontend monorepos with Turborepo, pnpm workspaces, Next.js 15 App Router, Svelte 5 Runes, shared TypeScript configurations, and isolated Vercel deployment pipelines.',
  },
  {
    id: 17,
    title: 'Building Polyglot Microservices: Node.js, Go, and Database-Per-Service',
    summary: 'Designing resilient backend microservices combining high-throughput Go daemons with Node.js REST APIs, independent PostgreSQL instances, idempotent event delivery, and distributed observability patterns.',
  },
];

async function prerender() {
  const distDir = path.resolve(__dirname, 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('[prerender] dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  let blogs = FALLBACK_BLOGS;
  try {
    const res = await fetch('https://mishrashardendu22-backend-blogwebsite-8196.onrender.com/api/blogs', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        blogs = json.data;
        console.log(`[prerender] Fetched ${blogs.length} blogs from live API.`);
      }
    }
  } catch (e) {
    console.log('[prerender] Live API fetch timed out or failed, using static catalog fallback:', e.message);
  }

  for (const blog of blogs) {
    const blogId = blog.id;
    const blogTitle = blog.title;
    const blogSummary = blog.summary || blog.title;
    const blogUrl = `https://blogs.mishrashardendu22.is-a.dev/read/${blogId}`;

    let articleHtml = baseHtml;

    // 1. Update Title
    articleHtml = articleHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${blogTitle} | Shardendu Mishra — Engineering Notes</title>`
    );

    // 2. Update Meta Description
    articleHtml = articleHtml.replace(
      /<meta name="description" content=".*?" \/>/i,
      `<meta name="description" content="${blogSummary.replace(/"/g, '&quot;')}" />`
    );

    // 3. Update Canonical Tag to exact article URL
    articleHtml = articleHtml.replace(
      /<link rel="canonical" href=".*?" \/>/i,
      `<link rel="canonical" href="${blogUrl}" />`
    );

    // 4. Update OpenGraph Tags
    articleHtml = articleHtml.replace(
      /<meta property="og:title" content=".*?" \/>/i,
      `<meta property="og:title" content="${blogTitle.replace(/"/g, '&quot;')}" />`
    );
    articleHtml = articleHtml.replace(
      /<meta property="og:description" content=".*?" \/>/i,
      `<meta property="og:description" content="${blogSummary.replace(/"/g, '&quot;')}" />`
    );
    articleHtml = articleHtml.replace(
      /<meta property="og:url" content=".*?" \/>/i,
      `<meta property="og:url" content="${blogUrl}" />`
    );

    // 5. Update Twitter Tags
    articleHtml = articleHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/i,
      `<meta name="twitter:title" content="${blogTitle.replace(/"/g, '&quot;')}" />`
    );
    articleHtml = articleHtml.replace(
      /<meta name="twitter:description" content=".*?" \/>/i,
      `<meta name="twitter:description" content="${blogSummary.replace(/"/g, '&quot;')}" />`
    );
    articleHtml = articleHtml.replace(
      /<meta name="twitter:url" content=".*?" \/>/i,
      `<meta name="twitter:url" content="${blogUrl}" />`
    );

    // 6. Inject Article Pre-Shell inside <div id="app">
    const articleShell = `
    <div id="app">
      <article style="max-width: 800px; margin: 40px auto 60px; padding: 0 20px; font-family: system-ui, sans-serif;">
        <nav aria-label="Breadcrumbs" style="margin-bottom: 2rem; display: flex; gap: 0.75rem; font-size: 0.95rem;">
          <a href="/" style="color: #60a5fa; text-decoration: none;">&larr; Back to all publications</a>
          <span style="color: #52525b;">/</span>
          <span style="color: #a1a1aa;">Article #${blogId}</span>
        </nav>
        <header style="margin-bottom: 2.5rem; border-bottom: 1px solid #27272a; padding-bottom: 1.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 700; line-height: 1.25; margin-bottom: 1rem; color: #ffffff;">${blogTitle}</h1>
          <p style="color: #71717a; font-size: 0.9rem;">By Shardendu Mishra • Published in Technical Engineering Notes</p>
        </header>
        <div style="color: #d4d4d8; line-height: 1.8; font-size: 1.05rem; margin-bottom: 3rem;">
          <p style="margin-bottom: 1.5rem;">${blogSummary}</p>
        </div>
        <footer style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #27272a; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="color: #60a5fa; text-decoration: none;">&larr; Browse All Technical Publications</a>
          <a href="https://mishrashardendu22.is-a.dev" style="color: #60a5fa; text-decoration: none;">Main Portfolio &rarr;</a>
        </footer>
      </article>
    </div>`;

    articleHtml = articleHtml.replace(/<div id="app">[\s\S]*?<\/div>\s*<script/i, `${articleShell}\n    <script`);

    // Write to dist/read/:id/index.html
    const targetDir = path.join(distDir, 'read', String(blogId));
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), articleHtml, 'utf-8');
    console.log(`[prerender] Generated static shell for /read/${blogId}`);
  }

  console.log('[prerender] Completed prerendering all blog pages successfully.');
}

prerender();
