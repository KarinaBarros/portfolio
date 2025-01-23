import { useState, useEffect } from "react";
import axios from "axios";
import '@/app/globals.css';
import NavAdmin from "@/components/nav-admin/nav-admin";
import { useRouter } from "next/router";

export default function Aprovar() {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await axios.get('/api/comentarios-false');
                setComentarios(response.data);
                console.log(response.data);

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
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        }
        console.log('id: ' + id);

        try {
            const response = await axios.post('/api/aprovar', { id: id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.error);
        }
    }

    return (
        <div>
            <NavAdmin />
            {loading ? (
                <div className="ml-64">Carregando...</div>
            ) : (
                <div className="ml-64">
                    <h2>Autorizar comentários</h2>
                    <br />
                    {comentarios.length > 0 ? (
                        comentarios.map((comentario) => (
                            <div key={comentario.id_comentario} >
                                <form onSubmit={(e) => handleSubmit(e, comentario.id_comentario)}>
                                    <p>Post id: {comentario.post_id}</p>
                                    <p>Autor: {comentario.autor_comentario}</p>
                                    <p>Criado: {comentario.criado}</p>
                                    <p>{comentario.conteudo_comentario}</p>
                                    <button type="submit">Autorizar</button>
                                </form>
                                <br />
                            </div>
                        ))
                    ) : (
                        <div>Sem novos comentários</div>
                    )}
                </div>
            )}
        </div>
    );
}    