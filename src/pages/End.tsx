import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
function End() {
  const navigate = useNavigate();
  return (
    <div>
        <div className='container'>
          <h1 className='titulo-painel'>MUITO OBRIGADO POR RESPONDER!</h1>
          <p>Clique no botão abaixo para retornar a tela inicial.</p>
          <button onClick={() => navigate('/')} >Tela Inicial</button>
        </div>
      </div>
  )
}

export default End;
