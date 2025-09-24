import logo_receita from '../assets/receita.png'
import logo_naf from '../assets/naf-unicentro.png'
function LogoImg(){
    return (
        <div>
            <img src={logo_receita} className='top-left-image' alt="logo-receita" />
            <img src={logo_naf} className='top-right-image' alt="logo-naf" />
        </div>
    )
}
export default LogoImg;