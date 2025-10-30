import "../index.css"
import logo_receita from "../assets/receita.png"
import { useNavigate } from 'react-router-dom'
import LogoImg from '../component/logo_img';
import Footer from '../component/footer';
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Início";
  }, []);
  return (
    <div className='page'>
      <div className="wrapper">
      <LogoImg></LogoImg>
          <div className='conteiner'>
            <h1 className='titulo-painel'>NAF Avalia</h1>
            <p className="home-text">Responda um conjunto de perguntas, para que possamos avaliar a qualidade do atendimento.</p>
            <button onClick={() => navigate('/form')} >Responder</button>
            <div className="parceria">
              <p>Uma parceria com a:</p>
              <img src={logo_receita} className="imagem-receita" alt="" />
            </div>

          </div>
        </div>
        <Footer/>
      </div>
  )
}

export default Home
