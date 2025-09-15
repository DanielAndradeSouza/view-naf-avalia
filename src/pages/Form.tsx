import "../index.css";
import questions from "./questions.json"
//São um total de 24 questões, muitas sendo radio questions, ou seja com valores predefinidos mas com apenas uma resposta
function Form(){

    return (
        <div className="container">
            <h1>Formulário</h1>
            {questions.map((q,indexQ) => (
                <div key={indexQ}>
                <p>{q.question}</p>
                
                {q.answers.map((answer,i) => (
                    <label key={i}>
                        <input type={q.type} key={q.id}
                        />
                        {answer}</label>
                ))}
                </div>
            ))}
            
        </div>
    );
}
export default Form;