import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Aprovar() {
    const [comentarios, setComentarios] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            } catch (err) {
                setLoading(false);
                setError('Você não tem acesso a esta página');
                router.push('/login');
            } 
            try {
                const response = await axios.get('/api/comentarios-false');
                setComentarios(response.data);

            } catch (error) {
                console.error('Ocorreu um erro ao recuperar os dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        try{
            const response = await axios.post('/api/aprovar', {id: id});
            alert(response.data.message);
            window.location.reload();
        }catch(error){
            alert(error.response?.data?.error);
        } 
    }

    return (
        <div>
            {loading ? (
                <div>Carregando...</div>
            ) : (
                <div>
                    {!error ? (
                        <div>
                            <h2>Autorizar comentários</h2>
                            <br />
                            {comentarios.length > 0 ? (
                                comentarios.map((comentario) => (
                                    <div key={comentario.id} >
                                        <form onSubmit={(e) => handleSubmit(e, comentario.id)}>
                                            <p>Post id: {comentario.post_id}</p>
                                            <p>Autor: {comentario.autor}</p>
                                            <p>Criado: {comentario.criado}</p>
                                            <p>{comentario.conteudo}</p>
                                            <button type="submit">Autorizar</button>
                                        </form>
                                        <br />
                                    </div>
                                ))
                            ) : (
                                <div>Sem novos comentários</div>
                            )}
                        </div>
                    ) : (
                        <div>{error}</div>
                    )}
                </div>
            )}
        </div>
    );
}    