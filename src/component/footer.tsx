import "../index.css"
export default function Footer(){
    return (
        <footer className="footer">
            <div className="footer-conteiner">
                <div className="footer-section">
                    <p className="footer-topic">Localização</p>
                    <p>Campus Santa Cruz</p>
                    <p>Rua Padre, R. Salvatore Renna, 875</p>
                    <p>Santa Cruz, Guarapuava - PR, 85015-430</p>
                </div>
                <div className="footer-section">
                    <p className="footer-topic">Contato</p>
                    <p>WhatsApp: (42) Algum numero</p>
                    <p>Email: naf@unicentro.br</p>
                </div>
                <div className="footer-section">
                    <p className="footer-topic">Instituição</p>
                    <p>Direitos reservados pela Unicentro</p>
                    <p>© 2025</p>
                </div>
            </div>
            
        </footer>
    )
}