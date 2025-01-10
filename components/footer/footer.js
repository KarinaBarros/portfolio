import Link from 'next/link';
import './footer.css';
import '@/app/globals.css';
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <div className='footer'>
            <div className='container-footer'>
                <div className='container-footer-nav'>
                    <Link href='/'>Home</Link>
                    <Link href='/sobre'>Sobre</Link>
                    <Link href='/projetos'>Projetos</Link>
                </div>
                <div className='container-footer-nav'>
                    <Link href='/contatos'>Contatos</Link>
                    <Link href='/blog'>Blog</Link>
                </div>
                <div className='container-footer-links'>
                    <a href='https://wa.me/5516997872488' target="_blank"><FaWhatsapp /></a>
                    <a href='https://www.linkedin.com/in/karina-barros-20b169292/' target="_blank"><FaLinkedin /></a>
                    <a href='https://github.com/KarinaBarros' target="_blank"><FaGithub /></a>
                </div>
            </div>
            <div className='copyright'><Link href='/copyright'>© Karina Barros, 2025</Link></div>
        </div>
    )
}