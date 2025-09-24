import "../index.css";
import "../styles/ModifyForm.css"
import LogoImg from "../component/logo_img";
import formStatus from './questions.json';

function ModifyForm() {
  return (
    <div>
      <LogoImg />
      <div className="conteiner">
        <h1>Bem Vindo</h1>
        <p>Nessa tela você consegue modificar o formulário de avaliação utilizado pelo NAF</p>
        <div className="question-conteiner">
        {formStatus.length ? (
          formStatus.map((question, index) => (
            <div key={index}>
              <p className="question-text">{index}. {question.text}</p>
              <p>Tipo de Resposta: {question.type}</p>
              {question.options.map((q, idx) => (
                <p key={idx}>{q}</p>
              ))}
            </div>
          ))
          
        ) : (
          <p>Formulário sem Conteúdo</p>
        )}</div>
      </div>
    </div>
  );
}

export default ModifyForm;
