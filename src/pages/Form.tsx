import { useEffect, useState } from "react";
import "../index.css";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import fetchData from "../utls/fetchData";
import LogoImg from "../component/logo_img";
import ReturnButton from "../component/return_button";

type Answer = string | string[] | null;

function Form() {
  const [question, setQuestionState] = useState<any[]>([]);
  const [answerState, setAnswerState] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState(0);
  const navigate = useNavigate();

  // Carregar perguntas
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData("question");
        setQuestionState(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Inicializar respostas quando as perguntas chegarem
  useEffect(() => {
    if (question.length > 0) {
      setAnswerState(
        question.map((q) =>
          q.type === "checkbox" ? [] : null
        )
      );
    }
  }, [question]);

  const totalQuestions = question.length;
  const q = question[pageState];

  // Navegação
  const nextPage = () =>
    setPageState((prev) => Math.min(prev + 1, totalQuestions - 1));
  const prevPage = () =>
    setPageState((prev) => Math.max(prev - 1, 0));

  // Manipula Radio
  const handleRadioState = (value: string) => {
    setAnswerState((prev) =>
      prev.map((ans, idx) =>
        idx === pageState ? value : ans
      )
    );
  };

  // Manipula Checkbox
  const handleCheckboxState = (value: string) => {
    setAnswerState((prev) =>
      prev.map((ans, idx) => {
        if (idx === pageState && Array.isArray(ans)) {
          return ans.includes(value)
            ? ans.filter((item) => item !== value)
            : [...ans, value];
        }
        return ans;
      })
    );
  };

  // Loading ou sem questão
  if (loading) {
    return (
      <div className="conteiner">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="conteiner">
        <p>Nenhuma questão encontrada.</p>
      </div>
    );
  }

  return (
    <div className="conteiner">
      <LogoImg />
      <ReturnButton path="/home"></ReturnButton>
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
          <button
            type="button"
            onClick={nextPage}
            disabled={
              answerState[pageState] === null ||
              (Array.isArray(answerState[pageState]) &&
                answerState[pageState].length === 0)
            }
          >
            Próxima Questão
          </button>
        )}
        {pageState === totalQuestions - 1 && (
          <button
            type="button"
            onClick={async () => {
              await fetchData("answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(answerState),
              });
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
