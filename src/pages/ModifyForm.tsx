import { useEffect, useState } from "react";
import "../index.css";
import "../styles/ModifyForm.css";
import LogoImg from "../component/logo_img";
import fetchData from "../utls/fetchData";
import { useNavigate } from "react-router-dom";

function ModifyForm() {
  const [formStatus, setFormStatus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

  return (
    <div>
      <LogoImg />
      <div className="conteiner">
        <button className="add-button" onClick={() => navigate("createQuestion")}>Adicionar</button>
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
                  <button>Atualizar</button>
                  <button>Deletar</button>
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
