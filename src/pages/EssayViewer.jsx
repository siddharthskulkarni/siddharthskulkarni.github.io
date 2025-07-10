import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { useState, useEffect } from 'react';
import { loadEssayById } from '../utils/essayLoader';

const EssayViewer = () => {
  const { id } = useParams();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEssay = async () => {
      try {
        const loadedEssay = await loadEssayById(id);
        setEssay(loadedEssay);
      } catch (error) {
        console.error('Error loading essay:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssay();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!essay) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Essay not found.
        </h1>
      </div>
    );
  }

  return (
    <article className="max-w-xl mx-auto font-[verdana]">
      <header className="mb-4">
        <h1 className="text-2xl font-normal text-blue-900 leading-tight">
          {essay.title}
        </h1>
        <div className="flex mt-2 spcenterace-x-4 text-sm text-gray-500">
          <span className="mr-2">{new Date(essay.date).toLocaleString('en-US', {month: "short"}) + ' ' + new Date(essay.date).getFullYear()}</span>
          <span>({essay.tags.join(", ")})</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-custom prose-lg text-justify">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // Custom styling for code blocks
            code({ inline, className, children, ...props }) {
              return !inline ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
            // Custom styling for headings
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-6 mt-12 first:mt-0 text-gray-900">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-4 mt-10 text-gray-900">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mb-3 mt-8 text-gray-900">{children}</h3>
            ),
            // Custom styling for paragraphs
            p: ({ children }) => (
              <p className="mb-6 leading-relaxed text-gray-700">{children}</p>
            ),
            // Custom styling for blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-6 italic bg-gray-50 py-4 rounded-r my-6 text-gray-700">
                {children}
              </blockquote>
            ),
            // Custom styling for lists
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            // Custom styling for links
            a: ({ href, children }) => (
              <a href={href} className="text-gray-900 underline hover:text-gray-700">
                {children}
              </a>
            ),
          }}
        >
          {essay.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default EssayViewer; 