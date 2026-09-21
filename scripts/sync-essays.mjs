import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import { Feed } from 'feed';
import { renderEssayHtml, SITE_ORIGIN } from './render-essay-html.mjs';

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, 'src', 'essays');
const outDir = path.join(repoRoot, 'public', 'essays');
const publicDir = path.join(repoRoot, 'public');

const sha1 = (text) =>
  crypto.createHash('sha1').update(text, 'utf8').digest('hex');

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const writeFeeds = async (essays) => {
  const feed = new Feed({
    title: 'Siddharth Kulkarni',
    description: "Siddharth Kulkarni's essays.",
    id: SITE_ORIGIN,
    link: SITE_ORIGIN,
    language: 'en',
    favicon: `${SITE_ORIGIN}/vite.svg`,
    copyright: `© ${new Date().getFullYear()} Siddharth Kulkarni`,
    author: {
      name: 'Siddharth Kulkarni',
      email: 'sidkmisc@gmail.com',
      link: SITE_ORIGIN,
    },
    feedLinks: {
      atom: `${SITE_ORIGIN}/atom.xml`,
      rss: `${SITE_ORIGIN}/rss.xml`,
    },
  });

  const visible = essays.filter(
    (essay) => !(essay.tags || []).includes('archive')
  );

  for (const essay of visible) {
    const permalink = `${SITE_ORIGIN}/essays/${essay.id}`;
    const html = await renderEssayHtml(essay.content);
    const categories = (essay.tags || [])
      .filter((tag) => tag && tag !== 'archive')
      .map((tag) => ({ name: tag }));

    feed.addItem({
      title: essay.title,
      id: permalink,
      link: permalink,
      description: essay.excerpt || undefined,
      content: html,
      date: new Date(essay.date),
      category: categories.length ? categories : undefined,
      author: [
        {
          name: 'Siddharth Kulkarni',
          email: 'sidkmisc@gmail.com',
          link: SITE_ORIGIN,
        },
      ],
    });
  }

  await fs.writeFile(path.join(publicDir, 'atom.xml'), feed.atom1(), 'utf8');
  await fs.writeFile(path.join(publicDir, 'rss.xml'), feed.rss2(), 'utf8');
};

export const syncEssays = async () => {
  await ensureDir(outDir);

  // Prune previously generated assets (supports deletions/renames)
  const existingOut = await fs.readdir(outDir, { withFileTypes: true });
  await Promise.all(
    existingOut
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => name !== '.gitkeep')
      .filter((name) => name.endsWith('.md') || name === 'index.json')
      .map((name) => fs.rm(path.join(outDir, name), { force: true }))
  );

  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort();

  const index = [];
  const essaysForFeed = [];

  for (const filename of mdFiles) {
    const id = filename.replace(/\.md$/, '');
    const fullPath = path.join(srcDir, filename);
    const raw = await fs.readFile(fullPath, 'utf8');
    const parsed = matter(raw);

    const content = parsed.content ?? '';
    const hash = sha1(content);

    const meta = {
      id,
      title: parsed.data?.title || 'Untitled',
      excerpt: parsed.data?.excerpt || '',
      date: parsed.data?.date || new Date().toISOString().split('T')[0],
      type: parsed.data?.type || 'draft',
      tags: parsed.data?.tags || [],
      outline: Boolean(parsed.data?.outline),
      hash,
    };

    index.push(meta);
    essaysForFeed.push({ ...meta, content });

    await fs.writeFile(path.join(outDir, filename), content, 'utf8');
  }

  index.sort((a, b) => new Date(b.date) - new Date(a.date));
  essaysForFeed.sort((a, b) => new Date(b.date) - new Date(a.date));

  await fs.writeFile(
    path.join(outDir, 'index.json'),
    JSON.stringify(index, null, 2) + '\n',
    'utf8'
  );

  await writeFeeds(essaysForFeed);
};

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  syncEssays().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
