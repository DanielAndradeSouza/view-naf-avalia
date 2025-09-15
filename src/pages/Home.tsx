import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
function Home() {
  const navigate = useNavigate();
  return (
    <div className='container'>
        <div>
          <h1 className='titulo-painel'>NAF Avalia</h1>
          <p>Responda um conjunto de perguntas, para que possamos avaliar a qualidade do atendimento.</p>
          <button onClick={() => navigate('/form')} >Responder</button>
        </div>
      </div>
  )
}

export default Home
