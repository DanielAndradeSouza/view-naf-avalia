import "../index.css";
import "../styles/ModifyForm.css";
import { useEffect, useState } from "react";
import LogoImg from "../component/logo_img";
import fetchData from "../utls/fetchData";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { VscAdd } from "react-icons/vsc";
import { FaRegTrashAlt } from "react-icons/fa";
import Footer from "../component/footer";

export default function ModifyForm() {
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

  function handleDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(formStatus);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormStatus(items);
  }

  // 🔥 Função para salvar a nova ordem no back-end
  async function handleSaveOrder() {
    try {
      const orderedIds = formStatus.map((q) => q.id);

      await fetchData("question/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderedIds),
      });

      alert("Ordem do formulário atualizada com sucesso!");
      navigate(0); // recarrega a página
    } catch (err) {
      if (err instanceof Error) {
        alert("Erro ao atualizar ordem:\n" + err.message);
      } else {
        alert("Erro desconhecido ao atualizar ordem.");
      }
    }
  }

  return (
    <div className="page">
      <LogoImg />

      <div className="wrapper">
        <div className="conteiner">
          <button
            className="add-button"
            onClick={() => navigate("createQuestion")}
          >
            <VscAdd size={20} color="black" />
          </button>

          <h1>Bem Vindo</h1>
          <p>
            Nessa tela você consegue modificar o formulário de avaliação
            utilizado pelo NAF.
          </p>

          {loading ? (
            <div className="question-conteiner">
              <p>Carregando...</p>
            </div>
          ) : formStatus.length ? (
            <>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {formStatus.map((question, index) => (
                        <Draggable
                          key={question.id}
                          draggableId={String(question.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="question-conteiner"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className={`question-block ${
                                  snapshot.isDragging ? "dragging" : ""
                                }`}
                              >
                                <p className="question-text-modify">
                                  {index + 1}. {question.text}
                                </p>
                                <p className="question-type">
                                  Tipo de Resposta: {question.type}
                                </p>

                                {question.options?.map(
                                  (q: string, idx: number) => (
                                    <p key={idx}>{q}</p>
                                  )
                                )}

                                <div className="question-buttons">
                                  <button
                                    className="update-button"
                                    onClick={() =>
                                      navigate(`updateQuestion/${question.id}`)
                                    }
                                  >
                                    Atualizar
                                  </button>

                                  <button
                                    className="delete-button"
                                    onClick={async () => {
                                      await fetchData(
                                        `question/deactivate/${question.id}`,
                                        { method: "PATCH" }
                                      );
                                      navigate(0);
                                    }}
                                  >
                                    <FaRegTrashAlt />
                                  </button>
                                </div>
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

              <button className="save-order-button" onClick={handleSaveOrder}>
                Atualizar Formulário
              </button>
            </>
          ) : (
            <div className="question-conteiner">
              <p>Formulário sem conteúdo.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}