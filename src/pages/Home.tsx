import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import LogoImg from '../component/logo_img';
import Footer from '../component/footer';
function Home() {
  const navigate = useNavigate();
  return (
    <div className='page'>
      <LogoImg></LogoImg>
        <div className='conteiner'>
          <h1 className='titulo-painel'>NAF Avalia</h1>
          <p>Responda um conjunto de perguntas, para que possamos avaliar a qualidade do atendimento.</p>
          <button onClick={() => navigate('/form')} >Responder</button>
        </div>

        <Footer/>
      </div>
  )
}

export default Home
