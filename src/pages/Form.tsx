import { useState } from "react";
import "../index.css";
import "../styles/Form.css"
import questions from "./questions.json"
//São um total de 24 questões, muitas sendo radio questions, ou seja com valores predefinidos mas com apenas uma resposta
function Form(){
    const totalQuestions = questions.length;
    const [answerState,setAnswerState] = useState();
    const [pageState,setPageState] = useState(0);
    const nextPage = () => setPageState(prev => prev+1);
    const prevPage = () => setPageState(prev => prev-1);
    const q = questions[pageState];
    return (
        <div className="container">
            <h1>Formulário</h1>
            <p>{q.question}</p>
            <div className="questions">
            {q.answers.map((answer,index) => (
                <label key={index}>
                    <input type={q.type} name="" id="" />
                    {answer}
                </label>
            ))}
            </div>
            <button>Questão Anterior</button> <button>Próxima Questão</button>
        </div>
    );
}
export default Form;