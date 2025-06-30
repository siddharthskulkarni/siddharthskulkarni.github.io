import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
        <div className="text-gray-600 dark:text-gray-300">Loading essay...</div>
      </div>
    );
  }

  if (!essay) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Essay not found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The essay you're looking for doesn't exist.
        </p>
        <Link 
          to="/essays"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to essays</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back Button */}
      <div className="mb-12">
        <Link 
          to="/essays"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to essays</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-16 space-y-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{new Date(essay.date).getFullYear()}</span>
          <span>•</span>
          <span>{essay.type}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {essay.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {essay.excerpt}
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-custom prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // Custom styling for code blocks
            code({ inline, className, children, ...props }) {
              return !inline ? (
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
            // Custom styling for headings
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-6 mt-12 first:mt-0 text-gray-900 dark:text-white">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-4 mt-10 text-gray-900 dark:text-white">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mb-3 mt-8 text-gray-900 dark:text-white">{children}</h3>
            ),
            // Custom styling for paragraphs
            p: ({ children }) => (
              <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
            ),
            // Custom styling for blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic bg-gray-50 dark:bg-gray-800 py-4 rounded-r my-6 text-gray-700 dark:text-gray-300">
                {children}
              </blockquote>
            ),
            // Custom styling for lists
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            // Custom styling for links
            a: ({ href, children }) => (
              <a href={href} className="text-gray-900 dark:text-white underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                {children}
              </a>
            ),
          }}
        >
          {essay.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Written by Siddharth Kulkarni
          </div>
          <Link 
            to="/essays"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            View all essays
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default EssayViewer; 