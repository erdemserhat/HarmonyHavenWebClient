import './enneagram.css';
import { useState, useEffect } from 'react';
import { enneagramService } from '../../../services/api/enneagramService';

export function Enneagram() {
    const [loading, setLoading] = useState(true);
    const [testResult, setTestResult] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    
    useEffect(() => {
        checkTestStatus();
    }, []);
    
    const checkTestStatus = async () => {
        try {
            setLoading(true);
            const { detailedResult, isTestTakenBefore } = await enneagramService.checkTestResult();
            
            if (isTestTakenBefore && detailedResult) {
                setTestResult(detailedResult);
            } else {
                // Test daha önce alınmadıysa intro ekranını göster
                setShowIntro(true);
                fetchQuestions();
            }
        } catch (error) {
            console.error('Test durumu kontrol edilirken hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchQuestions = async () => {
        try {
            const questionData = await enneagramService.getQuestions();
            setQuestions(questionData);
        } catch (error) {
            console.error('Sorular yüklenirken hata oluştu:', error);
        }
    };
    
    const handleAnswer = (questionId, score) => {
        // Var olan cevabı güncelle veya yeni cevap ekle
        const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
        
        if (existingAnswerIndex >= 0) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex] = { questionId, score };
            setAnswers(updatedAnswers);
        } else {
            setAnswers([...answers, { questionId, score }]);
        }
        
        // NOT: Burada index artırma işlemi kaldırıldı, 
        // artık tüm geçişler TestTakingSection'da yönetilecek
    };
    
    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };
    
    const submitAnswers = async () => {
        try {
            setLoading(true);
            const result = await enneagramService.sendQuestion(answers);
            setTestResult(result);
            setTestCompleted(true);
        } catch (error) {
            console.error('Cevaplar gönderilirken hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const retakeTest = () => {
        setTestResult(null);
        setAnswers([]);
        setCurrentQuestionIndex(0);
        setTestCompleted(false);
        setShowIntro(true);
        fetchQuestions();
    };
    
    const startTest = () => {
        setShowIntro(false);
    };
    
    if (loading) {
        return (
            <div className="enneagram-loading">
                <div className="spinner"></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }
    
    return (
        <div className="enneagram-container">
            {testResult ? (
                <TestResultDisplay result={testResult} retakeTest={retakeTest} />
            ) : showIntro ? (
                <IntroScreen questions={questions} startTest={startTest} />
            ) : (
                <TestTakingSection 
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    handleAnswer={handleAnswer}
                    goToPreviousQuestion={goToPreviousQuestion}
                    answers={answers}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    submitAnswers={submitAnswers}
                />
            )}
        </div>
    );
}

function IntroScreen({ questions, startTest }) {
    return (
        <div className="enneagram-intro-container">
            <div className="enneagram-intro-icon">
                <i className="fas fa-info-circle"></i>
            </div>
            
            <h1 className="intro-title">Enneagram Kişilik Testi</h1>
            
            <div className="test-info-list">
                <div className="test-info-item">
                    <span className="check-icon">✓</span>
                    <p>Bu test ortalama 10-15 dakika sürecektir.</p>
                </div>
                <div className="test-info-item">
                    <span className="check-icon">✓</span>
                    <p>Testteki soruları olmasını istediğiniz gibi değil, olduğunuz gibi cevaplamanız gerekmektedir.</p>
                </div>
                <div className="test-info-item">
                    <span className="check-icon">✓</span>
                    <p>Test boyunca istediğiniz cevabı geri dönüp değiştirebilirsiniz.</p>
                </div>
                <div className="test-info-item">
                    <span className="check-icon">✓</span>
                    <p>Mizaç tesbitinizin isabetli olabilmesi vereceğiniz cevapların doğruluğuna bağlıdır.</p>
                </div>
                <div className="test-info-item">
                    <span className="check-icon">✓</span>
                    <p>Testi tamamlamanız durumunda Harmonia sizi daha iyi tanıyacak ve size özel olarak sizinle sohbet edecektir.</p>
                </div>
            </div>
            
            <button className="test-start-button" onClick={startTest}>
                Teste Başla
            </button>
        </div>
    );
}

function TestTakingSection({ 
    questions, 
    currentQuestionIndex, 
    handleAnswer, 
    goToPreviousQuestion, 
    answers,
    setCurrentQuestionIndex,
    submitAnswers 
}) {
    const [showWarning, setShowWarning] = useState(false);
    // Dokunmatik algılama için
    const [touched, setTouched] = useState(false);
    
    if (!questions || questions.length === 0) {
        return (
            <div className="enneagram-loading">
                <div className="spinner"></div>
                <p>Sorular yükleniyor...</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = Math.floor(((currentQuestionIndex + 1) / questions.length) * 100);
    
    // Mevcut soru için cevabı bul
    const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
    const currentScore = currentAnswer ? currentAnswer.score : null;
    
    // Yerel cevap işleme fonksiyonu, 
    // handleAnswer'ı çağırır ve kendisi index artırmaz
    const processAnswer = (score) => {
        handleAnswer(currentQuestion.id, score);
        setShowWarning(false);
    };
    
    // Dokunmatik kullanıcı deneyimini iyileştiren event handler'lar
    const handleOptionTouchStart = () => {
        setTouched(true);
    };
    
    const handleOptionTouchEnd = (score) => {
        if (touched) {
            processAnswer(score);
            setTouched(false);
        }
    };
    
    // Bir sonraki soruya geçme işlemi
    const handleNextQuestion = () => {
        // Eğer mevcut soru cevaplanmadıysa uyarı göster
        if (currentScore === null) {
            setShowWarning(true);
            return;
        }
        
        setShowWarning(false); // Uyarıyı kaldır
        
        if (currentQuestionIndex === questions.length - 1) {
            submitAnswers();
        } else {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };
    
    return (
        <div className="enneagram-question-container">
            <div className="question-header">
                <h3>Soru {currentQuestionIndex + 1}/{questions.length}</h3>
                <div className="progress-bar">
                    <div className="progress-indicator" style={{ width: `${progress}%` }}></div>
                    <div className="progress-text">%{progress} tamamlandı</div>
                </div>
            </div>
            
            <div className="question-content">
                <p>{currentQuestion.content}</p>
                <p className="question-subtext">Yukarıdaki ifade sizi ne kadar yansıtıyor?</p>
                
                {showWarning && (
                    <div className="answer-warning">
                        Lütfen devam etmek için bir seçenek işaretleyin
                    </div>
                )}
                
                <div className="answer-options">
                    <div 
                        className={`answer-option ${currentScore === 0 ? 'selected' : ''}`} 
                        onClick={() => processAnswer(0)}
                        onTouchStart={handleOptionTouchStart}
                        onTouchEnd={() => handleOptionTouchEnd(0)}
                    >
                        <input 
                            type="radio" 
                            id="option-1" 
                            name="answer" 
                            checked={currentScore === 0}
                            onChange={() => processAnswer(0)}
                        />
                        <label htmlFor="option-1">Hiç yansıtmıyor</label>
                    </div>
                    <div 
                        className={`answer-option ${currentScore === 1 ? 'selected' : ''}`} 
                        onClick={() => processAnswer(1)}
                        onTouchStart={handleOptionTouchStart}
                        onTouchEnd={() => handleOptionTouchEnd(1)}
                    >
                        <input 
                            type="radio" 
                            id="option-2" 
                            name="answer" 
                            checked={currentScore === 1}
                            onChange={() => processAnswer(1)}
                        />
                        <label htmlFor="option-2">Biraz yansıtıyor</label>
                    </div>
                    <div 
                        className={`answer-option ${currentScore === 2 ? 'selected' : ''}`} 
                        onClick={() => processAnswer(2)}
                        onTouchStart={handleOptionTouchStart}
                        onTouchEnd={() => handleOptionTouchEnd(2)}
                    >
                        <input 
                            type="radio" 
                            id="option-3" 
                            name="answer" 
                            checked={currentScore === 2}
                            onChange={() => processAnswer(2)}
                        />
                        <label htmlFor="option-3">Kısmen yansıtıyor</label>
                    </div>
                    <div 
                        className={`answer-option ${currentScore === 3 ? 'selected' : ''}`} 
                        onClick={() => processAnswer(3)}
                        onTouchStart={handleOptionTouchStart}
                        onTouchEnd={() => handleOptionTouchEnd(3)}
                    >
                        <input 
                            type="radio" 
                            id="option-4" 
                            name="answer" 
                            checked={currentScore === 3}
                            onChange={() => processAnswer(3)}
                        />
                        <label htmlFor="option-4">Tam olarak yansıtıyor</label>
                    </div>
                </div>
            </div>
            
            <div className="navigation-buttons">
                <button 
                    className="prev-button" 
                    onClick={goToPreviousQuestion} 
                    disabled={currentQuestionIndex === 0}
                >
                    ← Önceki
                </button>
                <button 
                    className="next-button" 
                    onClick={handleNextQuestion}
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Tamamla' : 'Sonraki →'}
                </button>
            </div>
        </div>
    );
}

function TestResultDisplay({ result, retakeTest }) {
    const { dominantType, typeScores, wingType } = result.result;
    const { description, famousPeople } = result;
    
    // Mobil cihaz kontrolü
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div className="enneagram-result-container">
            <h2>Merhaba, Serhat</h2>
            
            <div className="result-card">
                <div className="result-type-display">
                    <div className="result-avatar-large">
                        <img 
                            src={result.chartUrl?.personalityImageUrl || "/assets/enneagram/default-avatar.png"} 
                            alt={`Tip ${dominantType.type} Avatar`} 
                        />
                    </div>
                    <div className="result-type-info">
                        <p>Senin Enneagram Tipin:</p>
                        <h1>Tip {dominantType.type}</h1>
                    </div>
                </div>
                
                <div className="result-description">
                    <h3>Bireyselci Yıldız (Özgün Profesyonel)</h3>
                    <div className="description-item">
                        <span>▶ Temel Motivasyon:</span> 
                        <p>Hem başarılı hem de benzersiz görünme arzusu.</p>
                    </div>
                    <div className="description-item">
                        <span>▶ Güçlü Yönler:</span> 
                        <p>Yaratıcılık, özgünlük, kendini ifade etme becerisi.</p>
                    </div>
                    <div className="description-item">
                        <span>▶ Zorluklar:</span> 
                        <p>Kıskançlık, kendini diğerlerinden üstün/özel görme eğilimi.</p>
                    </div>
                    <div className="description-item">
                        <span>▶ Stres Yönü (Tip 9):</span> 
                        <p>Depresif atalet ve hedef kaybı.</p>
                    </div>
                </div>
            </div>
            
            <div className="all-type-scores">
                <h3>Tüm Tip Skorların</h3>
                <div className="score-list">
                    {typeScores.map(score => (
                        <div key={score.type} className="score-item">
                            <span className="score-label">Tip {score.type}</span>
                            <div className="score-bar">
                                <div 
                                    className="score-indicator" 
                                    style={{ 
                                        width: `${(score.score / 10) * 100}%`,
                                        backgroundColor: score.type === dominantType.type ? '#4f4f4f' : '#777777'
                                    }}
                                ></div>
                            </div>
                            <span className="score-value">{score.score}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {famousPeople && famousPeople.length > 0 && (
                <div className="famous-people">
                    <h3>Ünlü Tip {dominantType.type}'ler</h3>
                    <div className="famous-list">
                        {famousPeople.map((person, index) => (
                            <div key={index} className="famous-item">
                                <div className="famous-image">
                                    <img src={person.imageUrl} alt={person.name} />
                                </div>
                                <div className="famous-details">
                                    <h4>{person.name}</h4>
                                    <p>{person.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <button className="retake-test-button" onClick={retakeTest}>
                Testi Tekrar Al
            </button>
        </div>
    );
}
