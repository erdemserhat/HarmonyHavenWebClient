import React, { useState, useRef, useEffect } from 'react';
import axios from '@/services/api/axios';
import ReactMarkdown from 'react-markdown';
import { IoPaperPlane } from 'react-icons/io5';
import './Chat.css';

export function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [waitingResponse, setWaitingResponse] = useState(false);
    const messagesEndRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const eventSourceRef = useRef(null);
    const inputRef = useRef(null);

    // Reset scroll position when component mounts
    useEffect(() => {
        // Only reset the chat messages scrolling, not the main window
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = 0;
        }
    }, []);

    // Set viewport meta on component mount and cleanup on unmount
    useEffect(() => {
        // Fix for mobile browsers to prevent resizing when keyboard opens
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        const originalContent = viewportMeta?.getAttribute('content');
        
        // Update viewport to prevent automatic zooming
        viewportMeta?.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        
        return () => {
            // Restore original viewport
            if (originalContent) {
                viewportMeta?.setAttribute('content', originalContent);
            }
        };
    }, []);

    useEffect(() => {
        // Welcome message on first load
        const welcomeMessage = {
            text: `Merhaba! Ben Harmony Haven AI. Size nasıl yardımcı olabilirim? Kişisel gelişiminiz ve ilhamınız için buradayım.`,
            isUser: false
        };
        setMessages([welcomeMessage]);
        
        // Clean up EventSource when component unmounts
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    // Handle keyboard appearance on mobile
    useEffect(() => {
        const handleResize = () => {
            // Force layout recalculation when keyboard appears/disappears
            document.documentElement.style.height = `${window.innerHeight}px`;
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        // Set initial height
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
        setWaitingResponse(true);

        // Reset textarea height
        if (inputRef.current) {
            inputRef.current.style.height = '48px';
        }

        // Add user message
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

        try {
            // Close previous EventSource if exists
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            
            // Encode user message for URL
            const encodedPrompt = encodeURIComponent(userMessage);
            
            // Create SSE connection
            const eventSource = new EventSource(`${axios.defaults.baseURL}/chat/${encodedPrompt}`, { 
                withCredentials: true 
            });
            eventSourceRef.current = eventSource;
            
            let isFirstMessage = true;
            
            // Handle SSE messages
            eventSource.onmessage = (event) => {
                const newText = event.data;
                
                if (isFirstMessage) {
                    // Remove loading animation and add new AI message on first message
                    setWaitingResponse(false);
                    setMessages(prev => [...prev, { text: newText, isUser: false }]);
                    isFirstMessage = false;
                } else {
                    // Update existing AI response with new text for subsequent messages
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastIndex = newMessages.length - 1;
                        
                        newMessages[lastIndex] = {
                            ...newMessages[lastIndex],
                            text: newMessages[lastIndex].text + newText
                        };
                        
                        return newMessages;
                    });
                }
            };
            
            // Handle SSE connection error
            eventSource.onerror = (error) => {
                console.error('SSE connection error:', error);
                eventSource.close();
                eventSourceRef.current = null;
                setIsLoading(false);
                setWaitingResponse(false);
            };
            
            // Handle SSE completion
            eventSource.addEventListener('complete', () => {
                eventSource.close();
                eventSourceRef.current = null;
                setIsLoading(false);
                setWaitingResponse(false);
            });
            
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', 
                isUser: false 
            }]);
            setIsLoading(false);
            setWaitingResponse(false);
        }
    };

    // Handle input focus to adjust view on mobile
    const handleInputFocus = () => {
        setTimeout(() => {
            scrollToBottom();
            // On iOS, we need to scroll the window as well
            window.scrollTo(0, 0);
        }, 300); // Small delay to let the keyboard open
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-messages" ref={chatMessagesRef}>
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
                    {waitingResponse && (
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
                    <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        onFocus={handleInputFocus}
                        placeholder="Mesajınızı yazın..."
                        disabled={isLoading}
                        className="chat-input"
                        autoComplete="off"
                        rows={1}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                        className="send-button"
                        aria-label="Mesajı gönder"
                    >
                        <IoPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
} 