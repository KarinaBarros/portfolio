import '@/app/globals.css';
import '@/styles/contatos.css'
import Nav from '@/components/nav/nav';
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import FormContato from '@/components/form-contato/form-contato';
import Footer from '@/components/footer/footer';
import HeadContatos from '@/components/head-contatos';

export default function Contatos() {
    return (
        <>
            <HeadContatos/>
            <div className='contatos'>
                <Nav />
                <h1>Contatos</h1>
                <div className='localizacao'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118560.81063442546!2d-48.24788320013145!3d-21.779280565622663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8f15fecb7508b%3A0xbdaebe35da49b086!2sAraraquara%2C%20State%20of%20S%C3%A3o%20Paulo!5e0!3m2!1sen!2sbr!4v1736512293682!5m2!1sen!2sbr"
                        //width="600" height="450" style="border:0;" 
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    <p>Araraquara / SP</p>
                </div>
                <div className='links'>
                    <a href='https://wa.me/5516997872488' className='whats' target="_blank"><FaWhatsapp /></a>
                    <a href='https://www.linkedin.com/in/karina-barros-20b169292/' className='linkedin' target="_blank"><FaLinkedin /></a>
                    <a href='https://github.com/KarinaBarros' className='github-link-contatos' target="_blank"><FaGithub /></a>
                </div>
                <FormContato />
            </div>
            <Footer />
        </>
    )
}