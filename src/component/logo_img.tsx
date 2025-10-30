import logo_rede_naf from '../assets/rede-naf.png'
import logo_naf from '../assets/naf-unicentro.png'
function LogoImg(){
    return (
        <div className='logo-img'>
            <img src={logo_rede_naf} className='top-left-image' alt="rede-naf.png" />
            <img src={logo_naf} className='top-right-image' alt="logo-naf" />
        </div>
    )
}
export default LogoImg;