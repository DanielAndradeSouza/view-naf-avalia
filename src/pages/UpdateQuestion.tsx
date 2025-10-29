import "../index.css";
import ReturnButton from "../component/return_button";
import { useEffect, useState } from "react";
import type { Question } from "../utls/Question";
import fetchData from "../utls/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../component/footer";

function UpdateQuestion() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [questionState, setQuestionState] = useState<Question>({
    text: "",
    type: "checkbox",
    options: [""],
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        document.title = "Atualizar";
        const data = await fetchData(`question/findOne/${id}`);
        setQuestionState(data);
      } catch (error) {
        console.error("Erro ao buscar a questão:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  useEffect(() => {
    const textEmpty = questionState.text.trim() === "";
    const allOptionsFilled = questionState.options.every(
      (opt) => opt.trim() !== ""
    );
    setIsDisabled(textEmpty || !allOptionsFilled);
  }, [questionState.text, questionState.options]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionState.options];
    newOptions[index] = value;
    setQuestionState({ ...questionState, options: newOptions });
  };

  const addOption = () => {
    if (questionState.options.length >= 10) {
      setErrorMessage("Máximo de 10 opções atingido.");
      return;
    }
    setErrorMessage("");
    setQuestionState({
      ...questionState,
      options: [...questionState.options, ""],
    });
  };

  const removeOption = (index: number) => {
    const newOptions = questionState.options.filter((_, i) => i !== index);
    setQuestionState({ ...questionState, options: newOptions });
    setErrorMessage(""); // limpa a mensagem de erro se houver
  };

  const handleUpdate = async () => {
    try {
      await fetchData(`question/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionState),
      });

      alert("Pergunta atualizada com sucesso!");
      navigate("/modifyForm");
    } catch (err) {
      if (err instanceof Error) {
        alert("Erro ao atualizar pergunta:\n" + err.message);
      } else {
        alert("Erro desconhecido ao atualizar pergunta.");
      }
    }
  };


  if (loading) return <p>Carregando...</p>;

  return (
    <div className="page">
      <ReturnButton path="/modifyForm" />
      <div className="wrapper">
        <div className="conteiner">
          <div className="questions-modify">
            <label htmlFor="text">Cabeçalho</label>
            <input
              type="text"
              id="text"
              value={questionState.text}
              onChange={(e) =>
                setQuestionState({ ...questionState, text: e.target.value })
              }
            />

            <select
              name="type"
              id="type"
              value={questionState.type}
              onChange={(e) =>
                setQuestionState({ ...questionState, type: e.target.value })
              }
            >
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
            </select>

            <p>Respostas</p>
            {questionState.options.map((option, index) => (
              <div key={index} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                />
                {questionState.options.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeOption(index)}>
                    Remover
                  </button>
                )}
              </div>
            ))}

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {questionState.options.length < 10 && (
              <button type="button" onClick={addOption}>
                Adicionar Opção
              </button>
            )}

            <button onClick={handleUpdate} disabled={isDisabled}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default UpdateQuestion;
