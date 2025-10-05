import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import LogoImg from '../component/logo_img';
function End() {
  const navigate = useNavigate();
  return (
    <div>
      <LogoImg></LogoImg>
        <div className='conteiner'>
          <h1 className='titulo-painel'>Obrigado por sua Resposta!</h1>
          <p>Clique no botão abaixo para retornar a tela inicial.</p>
          <button onClick={() => navigate('/home')} >Tela Inicial</button>
        </div>
      </div>
  )
}

export default End;
