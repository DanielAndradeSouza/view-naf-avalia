import { useEffect, useState } from "react";
import "../index.css";
import "../styles/ModifyForm.css";
import LogoImg from "../component/logo_img";
import fetchData from "../utls/fetchData";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

  function handleDragEnd(result: any){
    if(!result.destination) return;//Serve para caso o bloco tenha sido solto na região de fora do formulário

    const items = Array.from(formStatus);//Cópia do Array do formStatus
    const [reorderedItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0, reorderedItem);//Nestas duas linhas ele está trocando as duas perguntas de lugar.

    setFormStatus(items);//Atualiza o estado do FormStatus
  }

  return (
    <div>
      <LogoImg />
      <div className="conteiner">
        <button
          className="add-button"
          onClick={() => navigate("createQuestion")}
        >
          Adicionar
        </button>
        <h1>Bem Vindo</h1>
        <p>
          Nessa tela você consegue modificar o formulário de avaliação utilizado
          pelo NAF
        </p>

        <div className="question-conteiner">
          {loading ? (
            <p>Carregando...</p>
          ) : formStatus.length ? (//Cria o contexto de DragDrop, a partir deste bloco irá ter a lógica contida para as funcionalidades de arrastar
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}//Conecta os elementos a lógica interna da biblioteca
                  >
                    {formStatus.map((question, index) => (
                      <Draggable
                        key={question.id}
                        draggableId={String(question.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}//Conecta os elementos a lógica interna da biblioteca
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}//Propriedades necessárias para o arrastamento dos itens
                            className={`question-block ${
                              snapshot.isDragging ? "dragging" : ""//Verificação se o item está sendo arrastado
                            }`}
                          >
                            <p className="question-text">
                              {index + 1}. {question.text}
                            </p>
                            <p>Tipo de Resposta: {question.type}</p>
                            {question.options?.map((q: string, idx: number) => (
                              <p key={idx}>{q}</p>
                            ))}

                            <div className="question-buttons">
                              <button
                                onClick={() =>
                                  navigate(`updateQuestion/${question.id}`)
                                }
                              >
                                Atualizar
                              </button>
                              <button
                                onClick={async () => {
                                  await fetchData(
                                    `question/deactivate/${question.id}`,
                                    { method: "PATCH" }
                                  );
                                  navigate(0);
                                }}
                              >
                                Deletar
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <p>Formulário sem Conteúdo</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModifyForm;
