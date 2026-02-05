import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { useState, useEffect } from 'react';
import { loadEssayById } from '../utils/essayLoader';
import { Copy, Check} from 'lucide-react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={handleCopy}
        className="p-2.5 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] active:scale-90 text-gray-400 hover:text-white rounded-lg transition-all duration-200 backdrop-blur-md shadow-lg"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

const EssayViewer = () => {
  const { id } = useParams();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);

  // Generate slug from heading text
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
        <h1 className="text-xl font-normal text-blue-900 leading-tight">
          Essay not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative mt-8">
      <div className="flex">
        <article className="max-w-xl font-[verdana] min-w-0">
          <header className="mb-4">
            <h1 className="text-2xl font-normal text-blue-900 leading-tight">
              {essay.title}
            </h1>
            {/* <p className="text-gray-600 leading-relaxed">
              ({essay.excerpt})
            </p> */}
            <div className="flex mt-2 space-x-4 text-sm text-gray-500">
              <span className="mr-2">{new Date(essay.date).toLocaleString('en-US', {month: "short"}) + ' ' + new Date(essay.date).getFullYear()}</span>
              <span>({essay.tags.join(", ")})</span>
            </div>
          </header>

          <div className="text-justify">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isOutputBlock = className?.includes('output') || 
                                        String(children).startsWith('// Output:') ||
                                        String(children).startsWith('# Output:') ||
                                        String(children).startsWith('/* Output:') ||
                                        String(children).trim().startsWith('Output:');
                              
                  const codeText = String(children).replace(/\n$/, '');
                        
                  if (!inline && match && !isOutputBlock) {
                    return (
                      <div className="relative my-6 group">
                        <div className="absolute top-3 right-3 z-10">
                          <CopyButton text={codeText} />
                        </div>
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          showLineNumbers={true}
                          customStyle={{
                            width: '100%',
                            display: 'flex',
                            margin: 0,
                            padding: '1.25rem',
                            fontSize: '0.875rem',
                            borderRadius: '0.375rem',
                            backgroundColor: '#1e1e1e',
                            border: '1px solid #3e3e3e',
                            flexGrow: 1,
                            boxSizing: 'border-box'
                          }}
                          codeTagProps={{
                            style: {
                              fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', 'Monaco', monospace",
                              fontWeight: 'normal'
                            }
                          }}
                          lineNumberStyle={{
                            minWidth: '2.5em',
                            paddingRight: '1em',
                            color: '#858585',
                            userSelect: 'none'
                          }}
                          {...props}
                        >
                          {codeText}
                        </SyntaxHighlighter>
                      </div>
                    );
                  } 
                  else if (!inline && isOutputBlock) {
                    let outputText = codeText
                      .replace(/^\/\/ Output:\s*\n?/, '')
                      .replace(/^# Output:\s*\n?/, '')
                      .replace(/^\/\* Output:\s*\n?/, '')
                      .replace(/\s*\*\/$/, '')
                      .replace(/^Output:\s*\n?/, '')
                      .trim();
                    
                    return (
                      <div className="relative my-6 group">
                        <div className="absolute top-3 right-3 z-10">
                          <div className="absolute top-3 right-3 z-10">
                            <CopyButton text={codeText} />
                          </div>
                        </div>
                        <div className="bg-[#f5f5f5] rounded-md overflow-hidden border border-gray-300">
                          <div className="bg-[#e8e8e8] px-4 py-2 text-xs text-gray-600 font-medium border-b border-gray-300">
                            Output
                          </div>
                          <pre className="m-0 p-4 bg-transparent font-mono text-sm overflow-x-auto">
                            <code className="text-gray-800 whitespace-pre">
                              {outputText}
                            </code>
                          </pre>
                        </div>
                      </div>
                    );
                  }
                  else {
                    return (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800" {...props}>
                        {children}
                      </code>
                    );
                  }
                },
                h1: ({ children }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return (
                    <h1 id={id} className="text-2xl font-bold mb-6 mt-12 first:mt-0 text-gray-900 scroll-mt-24">
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return (
                    <h2 id={id} className="text-xl font-semibold mb-4 mt-10 text-gray-900 scroll-mt-24">
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return (
                    <h3 id={id} className="text-lg font-semibold mb-3 mt-8 text-gray-900 scroll-mt-24">
                      {children}
                    </h3>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-6 leading-relaxed text-gray-700">{children}</p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-6 italic bg-gray-50 py-4 rounded-r my-6 text-gray-700">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                a: ({href, children}) => (
                  <a 
                    href={href} 
                    className="text-gray-900 underline hover:text-gray-700"
                    onClick={(e) => {
                      if (href?.startsWith('#')) {
                        e.preventDefault();
                        const id = href.substring(1);
                        scrollToSection(id);
                      }
                    }}
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt, ...props }) => (
                  <a 
                    href={src} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block my-4 cursor-pointer"
                  >
                    <img 
                      src={src} 
                      alt={alt} 
                      className="max-w-full h-auto"
                      {...props}
                    />
                  </a>
                ),
              }}
            >
              {essay.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default EssayViewer;