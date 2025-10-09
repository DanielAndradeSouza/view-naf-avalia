import "../index.css"
import { useNavigate } from 'react-router-dom'
import LogoImg from '../component/logo_img';
import Footer from '../component/footer';
function End() {
  const navigate = useNavigate();
  return (
    <div className='page'>
      <LogoImg></LogoImg>
      
      <div className="wrapper">
          <div className='conteiner'>
            <h1 className='titulo-painel'>Obrigado por sua Resposta!</h1>
            <p>Clique no botão abaixo para retornar a tela inicial.</p>
            <button onClick={() => navigate('/home')} >Tela Inicial</button>
          </div>
        </div>
        <Footer/>
      </div>
  )
}

export default End;
