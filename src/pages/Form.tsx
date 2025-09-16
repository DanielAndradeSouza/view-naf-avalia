import { useState } from "react";
import "../index.css";
import "../styles/Form.css";
import questions from "./questions.json";

type Answer = string | number[] | null;

function Form() {
  // total de questões
  const totalQuestions = questions.length;

  // estado das respostas
  const [answerState, setAnswerState] = useState<Answer[]>(
    () =>
      questions.map((q) =>
        q.type === "checkbox" ? [...q.answers] : null
      )
  );

  // estado da página
  const [pageState, setPageState] = useState(0);

  // troca de página
  const nextPage = () =>
    setPageState((prev) => Math.min(prev + 1, totalQuestions - 1));
  const prevPage = () =>
    setPageState((prev) => Math.max(prev - 1, 0));

  const q = questions[pageState];

  // Manipula os dados de um campo Radio
  const handleRadioState = (value: string) => {
    setAnswerState((prev) =>
      prev.map((ans, idx) =>
        idx === pageState ? value : ans
      )
    );
  };

  // Manipula os dados de um campo Checkbox
  const handleCheckboxState = (index: number) => {
    setAnswerState((prev) =>
      //Itera dentro do antigo estado, se o novo estádo por diferente, reverto os valores
      prev.map((ans, idx) => {
        if (idx === pageState && Array.isArray(ans)) {
          const newAnswers = [...ans];
          newAnswers[index] = newAnswers[index] === 1 ? 0 : 1; // toggle
          return newAnswers;
        }
        return ans;
      })
    );
  };

  return (
    <div className="container">
      <h1>Formulário</h1>
      <p>{q.question}</p>
      <div className="questions">
        {q.options.map((answer: string, index: number) => (
          <label key={index}>
            <input
              type={q.type}
              name={`question-${pageState}`}
              value={answer}
              checked={
                q.type === "radio"
                  ? answerState[pageState] === answer
                  : Array.isArray(answerState[pageState]) &&
                    answerState[pageState][index] === 1
              }
              onChange={() =>
                q.type === "radio"
                  ? handleRadioState(answer)
                  : handleCheckboxState(index)
              }
            />
            {answer}
          </label>
        ))}
      </div>

      <div>
        {pageState > 0 && (
          <button type="button" onClick={prevPage}>
            Questão Anterior
          </button>
        )}
        {pageState < totalQuestions - 1 && (
          <button type="button" onClick={nextPage}>
            Próxima Questão
          </button>
        )}
        {pageState === totalQuestions - 1 && (
          <button
            type="button"
            onClick={() => console.log("Respostas finais:", answerState)}
          >
            Enviar Resposta
          </button>
        )}
      </div>
    </div>
  );
}

export default Form;
