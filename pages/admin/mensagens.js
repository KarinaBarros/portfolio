import NavAdmin from "@/components/nav-admin/nav-admin";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Mensagens() {

    const [responder, setResponder] = useState('flex flex-col');
    const [respondidas, setRespondidas] = useState('hidden');
    const [arquivadas, setArquivadas] = useState('hidden');
    const [colorResponder, setColorResponder] = useState('bg-gray-300');
    const [colorRespondidas, setColorRespondidas] = useState('bg-white');
    const [colorArquivadas, setColorArquivadas] = useState('bg-white');
    const [mensagens, setMensagens] = useState(null);
    const [loading, setLoading] = useState(false);

    const Mensagens = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('/api/mensagens', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setMensagens(response.data);

        } catch (error) {
            console.error('Ocorreu um erro ao recuperar os dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Mensagens();
    }, [])


    function mostrarDiv(div) {
        if (div === 'responder') {
            setResponder('flex flex-col');
            setRespondidas('hidden');
            setArquivadas('hidden');
            setColorResponder('bg-gray-300');
            setColorArquivadas('bg-white');
            setColorRespondidas('bg-white');
        } else if (div === 'respondidas') {
            setResponder('hidden');
            setRespondidas('flex flex-col');
            setArquivadas('hidden');
            setColorResponder('bg-white');
            setColorArquivadas('bg-white');
            setColorRespondidas('bg-gray-300');
        } else if (div === 'arquivadas') {
            setResponder('hidden');
            setRespondidas('hidden');
            setArquivadas('flex flex-col');
            setColorResponder('bg-white');
            setColorArquivadas('bg-gray-300');
            setColorRespondidas('bg-white');
        }
    }

    return (
        <>
            <NavAdmin />
            <div className="ml-64 p-4 flex flex-col">
                <h2 className="mx-auto mb-4 text-pink-500 text-2xl">Mensagens</h2>
                {loading ? <div>Carregando...</div> : <div>
                    <div>
                        <button className={`p-2 ${colorResponder}`} onClick={() => mostrarDiv('responder')}>Responder</button>
                        <button className={`p-2 ${colorRespondidas}`} onClick={() => mostrarDiv('respondidas')}>Respondidas</button>
                        <button className={`p-2 ${colorArquivadas}`} onClick={() => mostrarDiv('arquivadas')}>Arquivadas</button>
                    </div>
                    <div className={`bg-gray-300 mb-4 p-2 ${responder}`}>
                        {(mensagens && mensagens.naoRespondidas.length > 0) ? (
                            <table className="table-auto border-collapse border border-black">
                                <thead>
                                    <tr>
                                        <th className="border border-black px-4 py-2">Nome</th>
                                        <th className="border border-black px-4 py-2">Email</th>
                                        <th className="border border-black px-4 py-2">Assunto</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mensagens.naoRespondidas.map((mensagen) => (
                                        <tr key={mensagen.id} className="mb-2 cursor-pointer">
                                            <td className="border border-black px-4 py-2">{mensagen.nome}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.email}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.assunto}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                        ) : (<p>Sem novas mensagens.</p>)}
                    </div>
                    <div className={`bg-gray-300 mb-4 p-2 ${respondidas}`}>
                        {(mensagens && mensagens.respondidas.length > 0) ? (
                            <table className="table-auto border-collapse border border-black">
                                <thead>
                                    <tr>
                                        <th className="border border-black px-4 py-2">Nome</th>
                                        <th className="border border-black px-4 py-2">Email</th>
                                        <th className="border border-black px-4 py-2">Assunto</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mensagens.naoRespondidas.map((mensagen) => (
                                        <tr key={mensagen.id} className="mb-2">
                                            <td className="border border-black px-4 py-2">{mensagen.nome}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.email}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.assunto}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                        ) : (<p>Sem mensagens respondidas.</p>)}
                    </div>
                    <div className={`bg-gray-300 mb-4 p-2 ${arquivadas}`}>
                        {(mensagens && mensagens.arquivadas.length > 0) ? (
                            <table className="table-auto border-collapse border border-black">
                                <thead>
                                    <tr>
                                        <th className="border border-black px-4 py-2">Nome</th>
                                        <th className="border border-black px-4 py-2">Email</th>
                                        <th className="border border-black px-4 py-2">Assunto</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mensagens.naoRespondidas.map((mensagen) => (
                                        <tr key={mensagen.id} className="mb-2">
                                            <td className="border border-black px-4 py-2">{mensagen.nome}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.email}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.assunto}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                        ) : (<p>Sem mensagens arquivadas.</p>)}
                    </div>
                </div>}
                <div>
                    Mensagem
                </div>
            </div>
        </>
    )
}