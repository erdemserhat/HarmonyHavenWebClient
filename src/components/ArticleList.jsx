import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

export function ArticleList({ articles }) {
    return (
        <div className="article-list">
            {articles.map(article => (
                <Link 
                    key={article.id}
                    to={`/articles/${article.id}/${article.slug}`}
                    className="article-card"
                >
                    <div className="article-image">
                        <img
                            src={article.imagePath}
                            alt={article.title}
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80';
                            }}
                        />
                    </div>
                    <div className="article-info">
                        <h3 className="article-titlee" >{article.title}</h3>
                        <p className="article-preview">
                            {article.contentPreview || article.content.substring(0, 150) + '...'}
                        </p>
                        <span className="article-date">{article.publishDate}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
} 