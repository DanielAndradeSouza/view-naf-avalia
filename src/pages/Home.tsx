import "../index.css"
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
            <p>Responda um conjunto de perguntas, para que possamos avaliar a qualidade do atendimento.</p>
            <button onClick={() => navigate('/form')} >Responder</button>
          </div>
        </div>
        <Footer/>
      </div>
  )
}

export default Home
