import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import LogoImg from '../component/logo_img';
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <LogoImg></LogoImg>
        <div className='container'>
          <h1 className='titulo-painel'>NAF Avalia</h1>
          <p>Responda um conjunto de perguntas, para que possamos avaliar a qualidade do atendimento.</p>
          <button onClick={() => navigate('/form')} >Responder</button>
        </div>
      </div>
  )
}

export default Home
