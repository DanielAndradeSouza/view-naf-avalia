import "../index.css";
import LogoImg from "../component/logo_img";
import { useState } from "react";
import type { Question } from "../utls/Question";
import fetchData from "../utls/fetchData";
import { useNavigate } from "react-router-dom";

function UpdateQuestion() {
    const navigate = useNavigate();
  const [questionState, setQuestionState] = useState<Question>({
    text: "",
    type: "checkbox",
    options: [""],
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionState.options];
    newOptions[index] = value;
    setQuestionState({ ...questionState, options: newOptions });
  };

  const addOption = () => {
    setQuestionState({ ...questionState, options: [...questionState.options, ""] });
  };

  return (
    <div>
      <LogoImg />
      <div className="conteiner">
        <div className="questions">
          <label htmlFor="text">Cabeçalho</label>
          <input
            type="text"
            id="text"
            value={questionState.text}
            onChange={(e) => setQuestionState({ ...questionState, text: e.target.value })}
          />

          <select
            name="type"
            id="type"
            value={questionState.type}
            onChange={(e) => setQuestionState({ ...questionState, type: e.target.value })}
          >
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
            <p>Respostas</p>
          {questionState.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Opção ${index + 1}`}
            />
          ))}

          <button onClick={addOption}>Adicionar Opção</button>
          <button onClick={async () => {
            await fetchData("question/create",{"method":"POST", headers: {
              "Content-Type":"application/json"
            },
            body:JSON.stringify(questionState)
          })
            navigate("/modifyForm")
          }}>Registrar</button>
        </div>

      </div>
    </div>
  );
}

export default UpdateQuestion;
