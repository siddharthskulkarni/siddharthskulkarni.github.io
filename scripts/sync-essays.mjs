import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, 'src', 'essays');
const outDir = path.join(repoRoot, 'public', 'essays');

const sha1 = (text) =>
  crypto.createHash('sha1').update(text, 'utf8').digest('hex');

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const main = async () => {
  await ensureDir(outDir);

  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort();

  const index = [];

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

    await fs.writeFile(path.join(outDir, filename), content, 'utf8');
  }

  index.sort((a, b) => new Date(b.date) - new Date(a.date));
  await fs.writeFile(
    path.join(outDir, 'index.json'),
    JSON.stringify(index, null, 2) + '\n',
    'utf8'
  );
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
