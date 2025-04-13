import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ArticleDetail.css';
import { useState, useEffect } from 'react';
import axios from '../../../../services/api/axios.js';
import {LoadingSpinner} from "@/pages/common/loading_spinner/LoadingSpinner.jsx";
import { CodeBlock } from '../../../../components/CodeBlock';
import remarkGfm from 'remark-gfm';
import { SEO } from '../../../../components/SEO';

export function ArticleDetail() {
    const { id, slug } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!id || isNaN(id)) {
                    navigate('/404', { replace: true });
                    return;
                }

                const response = await axios.get(`/articles/${id}`);
                
                if (!response.data) {
                    navigate('/404', { replace: true });
                    return;
                }

                if (slug && slug !== response.data.slug) {
                    navigate('/404', { replace: true });
                    return;
                }
                
                setArticle(response.data);
            } catch (error) {
                console.error('Article fetch error:', error);
                navigate('/404', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, slug, navigate]);

    if (loading) return <LoadingSpinner/>;
    if (error) {
        return (
            <div className="error-container" role="alert">
                <h2>Hata</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/articles')}>Makalelere Dön</button>
            </div>
        );
    }
    if (!article) return null;

    const description = article.contentPreview || article.content.substring(0, 160) + '...';
    const imageUrl = article.imagePath || 'https://harmonyhaven.erdemserhat.com/ico.png';
    const canonicalUrl = `https://harmonyhaven.erdemserhat.com/articles/${id}/${article.slug}`;
    const keywords = `${article.title}, ${article.category || ''}, harmony haven, blog, kişisel gelişim, motivasyon`;

    return (
        <article className="article-detail-page">
            <SEO 
                title={article.title}
                description={description}
                keywords={keywords}
                canonicalUrl={canonicalUrl}
                ogImage={imageUrl}
                ogType="article"
            />

            <div className="article-detail-container">
                <nav className="back-button-container" aria-label="Gezinme">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <span className="back-arrow" aria-hidden="true">←</span> Geri
                    </button>
                </nav>

                {article && (
                    <>
                        <header className="article-header">
                            <h1 className="article-title">{article.title}</h1>
                            <div className="article-meta">
                                <time className="article-date" dateTime={article.publishDate}>
                                    {article.publishDate}
                                </time>
                            </div>
                        </header>

                        {article.imagePath && (
                            <figure className="article-cover">
                                <img 
                                    src={article.imagePath} 
                                    alt={article.title}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
                                    }}
                                />
                            </figure>
                        )}

                        <div className="article-content">
                            <ReactMarkdown
                                className="markdown-content"
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({node, inline, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <CodeBlock>
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            </CodeBlock>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    table({node, ...props}) {
                                        return (
                                            <table className="markdown-table" role="grid" {...props} />
                                        )
                                    },
                                    th({node, ...props}) {
                                        return (
                                            <th className="markdown-th" scope="col" {...props} />
                                        )
                                    },
                                    td({node, ...props}) {
                                        return (
                                            <td className="markdown-td" {...props} />
                                        )
                                    }
                                }}
                            >
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </>
                )}
            </div>
        </article>
    );
}
