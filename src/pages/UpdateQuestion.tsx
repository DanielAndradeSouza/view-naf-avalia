import "../index.css";
import LogoImg from "../component/logo_img";
import ReturnButton from "../component/return_button";
import { useEffect, useState } from "react";
import type { Question } from "../utls/Question";
import fetchData from "../utls/fetchData";
import { useNavigate, useParams } from "react-router-dom";

function UpdateQuestion() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [questionState, setQuestionState] = useState<Question>({
    text: "",
    type: "checkbox",
    options: [""],
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData(`question/findOne/${id}`); // busca só a questão
        setQuestionState(data);
      } catch (error) {
        console.error("Erro ao buscar a questão:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionState.options];
    newOptions[index] = value;
    setQuestionState({ ...questionState, options: newOptions });
  };

  const addOption = () => {
    setQuestionState({
      ...questionState,
      options: [...questionState.options, ""],
    });
  };

  const removeOption = (index: number) => {
    const newOptions = questionState.options.filter((_, i) => i !== index);
    setQuestionState({ ...questionState, options: newOptions });
  };

  const handleUpdate = async () => {
    await fetchData(`question/update/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionState),
    });
    navigate("/modifyForm");
  };

  if (loading) return <p>Carregando...</p>;

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

          <button onClick={handleUpdate}>
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateQuestion;
