import { useState } from 'react';
import './form-contato.css';
import '@/app/globals.css';
import axios from 'axios';

export default function FormContato(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [disabled, setDisabled] = useState(false);

    const enviarMensagem = async(e) => {
        e.preventDefault();
        setDisabled(true);
        try {
            const res = await axios.post('/api/enviar-mensagem', { nome, email, assunto, mensagem });
            alert(res.data.message);
            setNome('');
            setEmail('');
            setAssunto('');
            setMensagem('');
            setDisabled(false);
        } catch (err) {
            if (err.response) {
                alert(`Erro ao enviar mensagem.`);
              } else {
                alert('Erro ao conectar ao servidor.');
              }
            setDisabled(false);
        }
    }

    return(
        <form className="form-contato" onSubmit={enviarMensagem}>
            <h2>Entre em contato</h2>

            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength='50' required/>

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength='80'required/>

            <label htmlFor="assunto">Assunto:</label>
            <input type="text" name="assunto" value={assunto} onChange={(e) => setAssunto(e.target.value)} maxLength='50'required/>

            <label htmlFor="mensagem">Mensagem:</label>
            <textarea type="text" name="mensagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} maxLength='800'required/>

            <button type='submit' disabled={disabled}>{disabled ? 'Enviando...' : 'Enviar'}</button>
        </form>
    )
}