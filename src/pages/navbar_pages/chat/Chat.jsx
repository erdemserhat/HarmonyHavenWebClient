import React, { useState, useRef, useEffect } from 'react';
import axios from '@/services/api/axios';
import ReactMarkdown from 'react-markdown';
import { IoPaperPlane } from 'react-icons/io5';
import './Chat.css';

export function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // İlk açılışta karşılama mesajı
        const welcomeMessage = {
            text: `Merhaba! Ben Harmony Haven AI. Size nasıl yardımcı olabilirim? Kişisel gelişiminiz ve ilhamınız için buradayım.`,
            isUser: false
        };
        setMessages([welcomeMessage]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);

        // Kullanıcı mesajını ekle
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

        try {
            const response = await axios.post('/chat', { text: userMessage });
            console.log(response);
            
            // AI yanıtını ekle
            setMessages(prev => [...prev, { text: response.data.text, isUser: false }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', 
                isUser: false 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-header">
                    <h1>Harmony Haven AI</h1>
                    <p>Kişisel gelişim ve ilham asistanınız</p>
                </div>
                
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
                        >
                            <div className="message-content">
                                <ReactMarkdown
                                    components={{
                                        p: ({node, ...props}) => <p className="markdown-p" {...props} />,
                                        h1: ({node, ...props}) => <h1 className="markdown-h1" {...props} />,
                                        h2: ({node, ...props}) => <h2 className="markdown-h2" {...props} />,
                                        h3: ({node, ...props}) => <h3 className="markdown-h3" {...props} />,
                                        ul: ({node, ...props}) => <ul className="markdown-ul" {...props} />,
                                        ol: ({node, ...props}) => <ol className="markdown-ol" {...props} />,
                                        li: ({node, ...props}) => <li className="markdown-li" {...props} />,
                                        code: ({node, inline, ...props}) => 
                                            inline ? 
                                                <code className="markdown-code-inline" {...props} /> : 
                                                <code className="markdown-code-block" {...props} />,
                                        pre: ({node, ...props}) => <pre className="markdown-pre" {...props} />,
                                        blockquote: ({node, ...props}) => <blockquote className="markdown-blockquote" {...props} />,
                                        a: ({node, ...props}) => <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />,
                                        img: ({node, ...props}) => <img className="markdown-img" {...props} />,
                                        table: ({node, ...props}) => <table className="markdown-table" {...props} />,
                                        th: ({node, ...props}) => <th className="markdown-th" {...props} />,
                                        td: ({node, ...props}) => <td className="markdown-td" {...props} />,
                                    }}
                                >
                                    {message.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message ai-message">
                            <div className="message-content loading">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        disabled={isLoading}
                        className="chat-input"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !inputMessage.trim()}
                        className="send-button"
                    >
                        <IoPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
} 