import Nav from "@/components/nav/nav";
import "@/styles/copyright.css"
import Link from "next/link";

export default function Copyright() {
    return (
        <div className="copyright">
            <Nav />
            <div className="container-copyright">
                <h1>Copyright</h1>
                <h2>© Karina Barros, 2025.</h2>
                <h3>Todos os direitos reservados</h3>
                <p>Este site e todo o seu conteúdo, incluindo artigos, projetos e imagens, são de propriedade exclusiva do autor. Nenhuma parte deste portfólio pode ser reproduzida, distribuída ou transmitida em qualquer forma ou por qualquer meio sem a permissão prévia por escrito do autor.</p>
                <p>As opiniões expressas no blog são exclusivamente do autor e não representam necessariamente as opiniões de terceiros.</p>
                <p>Se você deseja compartilhar ou referenciar qualquer conteúdo deste site, entre em contato previamente para obter autorização.</p>
                <div className="link-copyright"><Link href='/contatos'>Contatos</Link></div>
            </div>
        </div>
    )
}