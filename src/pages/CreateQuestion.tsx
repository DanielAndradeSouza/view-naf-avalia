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

  useEffect(() => {
    const textEmpty = questionState.text.trim() === "";
    const hasAnyOptionFilled = questionState.options.every(
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
    setQuestionState((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index: number) => {
    setQuestionState((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
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

          <button type="button" onClick={addOption}>
            Adicionar Opção
          </button>

          <button
            disabled={isDisabled}
            onClick={async () => {
              await fetchData("question/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(questionState),
              });
              navigate("/modifyForm");
            }}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
