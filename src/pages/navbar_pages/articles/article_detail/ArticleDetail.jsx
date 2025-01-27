import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ArticleDetail.css';
import { useState, useEffect } from 'react';
import axios from '../../../../services/api/axios.js';
import {LoadingSpinner} from "@/pages/common/loading_spinner/LoadingSpinner.jsx";

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
            <div className="error-container">
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

    return (
        <div className="article-detail-page">
            <Helmet>
                {/* Temel meta etiketleri */}
                <title>{`${article.title} - Harmony Haven`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />

                {/* OpenGraph meta etiketleri */}
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Harmony Haven" />
                <meta property="article:published_time" content={article.publishDate} />
                <meta property="article:author" content="Harmony Haven" />

                {/* Twitter Card meta etiketleri */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
                <meta name="twitter:site" content="@harmonyhaven" />

                {/* Ek meta etiketleri */}
                <meta name="author" content="Harmony Haven" />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={`${article.title}, harmony haven, blog, teknoloji`} />
            </Helmet>

            <div className="article-detail-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <span className="back-arrow">←</span> Geri
                </button>

                {article && (
                    <>
                        <div className="article-header">
                            <h1 className="article-title">{article.title}</h1>
                            <div className="article-meta">
                                <span className="article-date">
                                    {article.publishDate}
                                </span>
                            </div>
                        </div>

                        {article.imagePath && (
                            <div className="article-cover">
                                <img 
                                    src={article.imagePath} 
                                    alt={article.title}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
                                    }}
                                />
                            </div>
                        )}

                        <div className="article-content">
                            <ReactMarkdown
                                className="markdown-content"
                                components={{
                                    code({node, inline, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
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
        </div>
    );
}
