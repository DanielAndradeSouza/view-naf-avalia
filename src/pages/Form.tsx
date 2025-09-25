import { useState } from "react";
import "../index.css";
import "../styles/Form.css";
import questions from "./questions.json";
import { useNavigate } from "react-router-dom";
import fetchData from "../utls/fetchData";
import LogoImg from "../component/logo_img";

type Answer = string | string[] | null;

function Form() {
  const totalQuestions = questions.length;
  const navigate = useNavigate();

  // Estado das respostas
  const [answerState, setAnswerState] = useState<Answer[]>(
    () =>
      questions.map((q) =>
        q.type === "checkbox" ? [] : null
      )
  );

  // Estado da página
  const [pageState, setPageState] = useState(0);

  const nextPage = () =>
    setPageState((prev) => Math.min(prev + 1, totalQuestions - 1));
  const prevPage = () =>
    setPageState((prev) => Math.max(prev - 1, 0));

  const q = questions[pageState];

  // Manipula Radio
  const handleRadioState = (value: string) => {
    setAnswerState((prev) =>
      prev.map((ans, idx) =>
        idx === pageState ? value : ans
      )
    );
  };

  // Manipula Checkbox (agora guarda strings)
  const handleCheckboxState = (value: string) => {
    setAnswerState((prev) =>
      prev.map((ans, idx) => {
        if (idx === pageState && Array.isArray(ans)) {
          // Se já contém a string, remove
          if (ans.includes(value)) {
            return ans.filter((item) => item !== value);
          }
          // Se não contém, adiciona
          return [...ans, value];
        }
        return ans;
      })
    );
  };

  return (
    <div className="conteiner">
      <LogoImg />
      <h1>Formulário</h1>
      <p>{q.text}</p>
      <div className="questions">
        {q.options.map((answer: string, index: number) => (
          <label key={index}>
            <input
              type={q.type}
              name={`${pageState}`}
              value={answer}
              checked={
                q.type === "radio"
                  ? answerState[pageState] === answer
                  : Array.isArray(answerState[pageState]) &&
                    answerState[pageState].includes(answer)
              }
              onChange={() =>
                q.type === "radio"
                  ? handleRadioState(answer)
                  : handleCheckboxState(answer)
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
            onClick={async () => {
              await fetchData("Form", answerState);
              navigate("/end");
            }}
          >
            Enviar Resposta
          </button>
        )}
      </div>
    </div>
  );
}

export default Form;
