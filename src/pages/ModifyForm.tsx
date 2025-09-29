import { useEffect, useState } from "react";
import "../index.css";
import "../styles/ModifyForm.css";
import LogoImg from "../component/logo_img";
import fetchData from "../utls/fetchData";

function ModifyForm() {
  const [formStatus, setFormStatus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData("question");
        setFormStatus(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = (index: number) => {
    const confirmed = window.confirm("Deseja realmente deletar esta pergunta?");
    if (!confirmed) return;

    const newFormStatus = [...formStatus];
    newFormStatus.splice(index, 1);
    setFormStatus(newFormStatus);
  };

  const handleUpdate = (index: number) => {
    const updatedText = window.prompt(
      "Digite o novo texto da pergunta:",
      formStatus[index].text
    );
    if (!updatedText) return;

    const newFormStatus = [...formStatus];
    newFormStatus[index] = {
      ...newFormStatus[index],
      text: updatedText,
    };
    setFormStatus(newFormStatus);
  };

  return (
    <div>
      <LogoImg />
      <div className="conteiner">
        <h1>Bem Vindo</h1>
        <p>Nessa tela você consegue modificar o formulário de avaliação utilizado pelo NAF</p>
        <div className="question-conteiner">
          {loading ? (
            <p>Carregando...</p>
          ) : formStatus.length ? (
            formStatus.map((question, index) => (
              <div key={index} className="question-block">
                <p className="question-text">
                  {index + 1}. {question.text}
                </p>
                <p>Tipo de Resposta: {question.type}</p>
                {question.options?.map((q: string, idx: number) => (
                  <p key={idx}>{q}</p>
                ))}

                <div className="question-buttons">
                  <button onClick={() => handleUpdate(index)}>Atualizar</button>
                  <button onClick={() => handleDelete(index)}>Deletar</button>
                </div>
              </div>
            ))
          ) : (
            <p>Formulário sem Conteúdo</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModifyForm;
