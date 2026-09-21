import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const SITE_ORIGIN = 'https://siddharthsk.com';

const absolutizeUrl = (value) => {
  if (!value || typeof value !== 'string') return value;
  if (value.startsWith('/') && !value.startsWith('//')) {
    return `${SITE_ORIGIN}${value}`;
  }
  return value;
};

const rehypeAbsolutizeUrls = () => (tree) => {
  visit(tree, 'element', (node) => {
    if (!node.properties) return;
    if (typeof node.properties.href === 'string') {
      node.properties.href = absolutizeUrl(node.properties.href);
    }
    if (typeof node.properties.src === 'string') {
      node.properties.src = absolutizeUrl(node.properties.src);
    }
  });
};

/**
 * Render essay markdown to HTML for Atom/RSS (KaTeX HTML+MathML, absolute URLs).
 */
export const renderEssayHtml = async (markdown) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, { output: 'htmlAndMathml' })
    .use(rehypeAbsolutizeUrls)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown ?? '');

  return String(file);
};

export { SITE_ORIGIN };
