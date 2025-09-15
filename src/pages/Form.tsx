import { useState } from "react";
import "../index.css";
import "../styles/Form.css"
import questions from "./questions.json"
//São um total de 24 questões, muitas sendo radio questions, ou seja com valores predefinidos mas com apenas uma resposta
function Form(){
    const totalQuestions = questions.length;
    const [answerState,setAnswerState] = useState();
    const [pageState,setPageState] = useState(0);
    const nextPage = () => setPageState(prev => Math.min(prev + 1, totalQuestions - 1));
    const prevPage = () => setPageState(prev => Math.max(prev - 1, 0));
    const q = questions[pageState];
    return (
        <div className="container">
            <h1>Formulário</h1>
            <p>{q.question}</p>
            <div className="questions">
            {q.options.map((answer,index) => (
                <label key={index}>
                    <input type={q.type} name="" id="" />
                    {answer}
                </label>
            ))}
            </div>
            <div>
                {pageState > 0 && (
                    <button type="button" onClick={prevPage}>Questão Anterior</button>
                )}
                {pageState < totalQuestions-1 && (
                    <button type="button" onClick={nextPage}>Próxima Questão</button>
                )}
                {pageState === totalQuestions-1 && (
                    <button type="button">Enviar Resposta</button>
                )}
            </div>
        </div>
    );
}
export default Form;