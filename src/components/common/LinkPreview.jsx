import { useState, useEffect } from 'react';
import axios from 'axios';
import './LinkPreview.css';

export function LinkPreview({ articleId }) {
    const [metaData, setMetaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetaData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://harmonyhavenappserver.erdemserhat.com/api/v1/articles/${articleId}/meta`);
                console.log('Meta verisi:', response.data);
                setMetaData(response.data);
            } catch (err) {
                console.error("Meta veri hatası:", err);
                setError('Meta verileri yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        if (articleId) {
            fetchMetaData();
        }
    }, [articleId]);

    useEffect(() => {
        console.log('MetaData durumu:', metaData);
    }, [metaData]);

    if (loading) return <div className="link-preview-skeleton" />;
    if (error) return <div className="link-preview-error">{error}</div>;
    if (!metaData) return null;

    return (
        <div className="link-preview" onClick={() => window.open(metaData.url, '_blank')}>
            <div className="link-preview-image">
                <img 
                    src={metaData.image} 
                    alt={metaData.title}
                    onError={(e) => {
                        e.target.src = 'https://harmonyhaven.erdemserhat.com/ico.png';
                    }}
                />
            </div>
            <div className="link-preview-content">
                <h3 className="link-preview-title">{metaData.title}</h3>
                <p className="link-preview-description">{metaData.description}</p>
                <span className="link-preview-domain">harmonyhaven.erdemserhat.com</span>
            </div>
        </div>
    );
} 