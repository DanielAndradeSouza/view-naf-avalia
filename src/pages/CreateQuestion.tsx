import "../index.css";
import LogoImg from "../component/logo_img";
import ReturnButton from "../component/return_button";
import { useState, useEffect } from "react";
import type { Question } from "../utls/Question";
import fetchData from "../utls/fetchData";
import { useNavigate } from "react-router-dom";

function CreateQuestion() {
  const navigate = useNavigate();
  const [questionState, setQuestionState] = useState<Question>({
    text: "",
    type: "checkbox",
    options: [""],
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const textEmpty = questionState.text.trim() === "";
    const hasAnyOptionFilled = questionState.options.some(
      (opt) => opt.trim() !== ""
    );
    setIsDisabled(textEmpty || !hasAnyOptionFilled);
  }, [questionState.text, questionState.options]);

  const handleOptionChange = (index: number, value: string) => {
    setQuestionState((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  const addOption = () => {
    if (questionState.options.length >= 10) {
      setErrorMessage("Máximo de 10 opções atingido.");
      return;
    }
    setErrorMessage("");
    setQuestionState((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index: number) => {
    setQuestionState((prev) => {
      const newOptions = prev.options.filter((_, i) => i !== index);
      return { ...prev, options: newOptions };
    });
    setErrorMessage(""); // limpa a mensagem se houver
  };

  const handleSubmit = async () => {
    await fetchData("question/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionState),
    });
    navigate("/modifyForm");
  };

  return (
    <div>
      <LogoImg />
      <ReturnButton path="/modifyForm" />
      <div className="conteiner">
        <div className="questions">
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
                <button type="button" onClick={() => removeOption(index)}>
                  Remover
                </button>
              )}
            </div>
          ))}

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          {/* Exibe o botão apenas se houver menos de 10 opções */}
          {questionState.options.length < 10 && (
            <button type="button" onClick={addOption}>
              Adicionar Opção
            </button>
          )}

          <button disabled={isDisabled} onClick={handleSubmit}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
