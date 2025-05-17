import {useEffect, useState} from "react";
import {enneagramService} from '/src/services/api/enneagramService.ts';

export function Enneagram(){
    const [questions, setQuestions] = useState([]);


    const answers = [
        { "questionId": "680fb0a5646e281bb77a17fb", "score": 1 },
        { "questionId": "680fb0a5646e281bb77a17fc", "score": 1 },
    ]

    useEffect(() => {
        const fetchData = async () => {
            const data = await enneagramService.getQuestions();
            console.log(data); // ✅ Artık burada veri geliyor
            setQuestions(data);  // Soruları state'e koy
        };

      // fetchData();
    }, []);

    useEffect(() => {

        const postData = async () => {
            const data = await enneagramService.sendQuestion(answers);
            console.log(data); // ✅ Artık burada veri geliyor

        }

        postData();

    });

    return (
        <div>
            <h2>Enneagram Soruları</h2>
            <ul>
                {questions.map((q) => (
                    <li key={q.id}>

                    </li>
                ))}
            </ul>
        </div>
    );
}