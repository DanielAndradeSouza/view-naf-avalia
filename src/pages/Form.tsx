import { useEffect, useState } from "react";
import "../index.css";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import fetchData from "../utls/fetchData";
import ReturnButton from "../component/return_button";
import Footer from "../component/footer";
import {
  FaCheckSquare,
  FaRegSquare,
  FaDotCircle,
  FaRegCircle,
} from "react-icons/fa";

type Answer = string | string[] | null;

function Form() {
  const [question, setQuestionState] = useState<any[]>([]);
  const [answerState, setAnswerState] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        document.title = "Formulário";
        const data = await fetchData("question") || [];
        setQuestionState(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (question.length > 0) {
      setAnswerState(question.map((q) => (q.type === "checkbox" ? [] : null)));
    }
  }, [question]);

  const totalQuestions = question.length;
  const q = question[pageState];

  const nextPage = () =>
    setPageState((prev) => Math.min(prev + 1, totalQuestions - 1));
  const prevPage = () => setPageState((prev) => Math.max(prev - 1, 0));

  const handleRadioState = (value: string) => {
    setAnswerState((prev) =>
      prev.map((ans, idx) => (idx === pageState ? value : ans))
    );
  };

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

  const isCurrentQuestionAnswered = () => {
    const ans = answerState[pageState];
    return ans !== null && (!Array.isArray(ans) || ans.length > 0);
  };

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
  const handleSendAnswers = async () => {
    try {
      const payload = question.map((q, idx) => {
        const answer = answerState[idx];
        return {
          questionId: q.id,
          answer: Array.isArray(answer) ? answer : [answer],
        };
      });

      await fetchData("answer/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Respostas enviadas com sucesso!");
      navigate("/end");
    } catch (err) {
      if (err instanceof Error) {
        alert("Erro ao enviar respostas:\n" + err.message);
      } else {
        alert("Erro desconhecido ao enviar respostas.");
      }
    }
  };
  return (
    <div className="page">
      <ReturnButton path="/home" />
      <div className="wrapper">
        <div className="conteiner">
          <h3>
            Pergunta {pageState + 1} de {totalQuestions}
          </h3>

          <div className="form-background">
            <p className="title-question-text">{q.text}</p>

            <div className="questions">
              {q.options.map((answer: string, index: number) => {
                const isChecked =
                  q.type === "radio"
                    ? answerState[pageState] === answer
                    : Array.isArray(answerState[pageState]) &&
                      answerState[pageState].includes(answer);

                return (
                  <label
                    key={index}
                    className="option"
                    htmlFor={`option-${pageState}-${index}`}
                  >
                    <input
                      id={`option-${pageState}-${index}`}
                      type={q.type}
                      name={`${pageState}`}
                      value={answer}
                      checked={isChecked}
                      onChange={() =>
                        q.type === "radio"
                          ? handleRadioState(answer)
                          : handleCheckboxState(answer)
                      }
                      className="hidden-input"
                    />

                    <span className="custom-icon">
                      {q.type === "checkbox" ? (
                        isChecked ? (
                          <FaCheckSquare className="icon checked" />
                        ) : (
                          <FaRegSquare className="icon unchecked" />
                        )
                      ) : isChecked ? (
                        <FaDotCircle className="icon checked" />
                      ) : (
                        <FaRegCircle className="icon unchecked" />
                      )}
                    </span>

                    <span className="answer-text">{answer}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="buttons">
            {pageState > 0 && (
              <button type="button" onClick={prevPage}>
                Questão Anterior
              </button>
            )}

            {pageState < totalQuestions - 1 && (
              <button
                type="button"
                onClick={nextPage}
                disabled={!isCurrentQuestionAnswered()}
              >
                Próxima Questão
              </button>
            )}

            {pageState === totalQuestions - 1 && (
                <button
                  type="button"
                  disabled={!isCurrentQuestionAnswered()}
                  onClick={handleSendAnswers}
                >
                  Enviar Resposta
                </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Form;
