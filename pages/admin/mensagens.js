import NavAdmin from "@/components/nav-admin/nav-admin";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

export default function Mensagens() {

    const [responder, setResponder] = useState('flex flex-col');
    const [respondidas, setRespondidas] = useState('hidden');
    const [arquivadas, setArquivadas] = useState('hidden');
    const [colorResponder, setColorResponder] = useState('bg-gray-300');
    const [colorRespondidas, setColorRespondidas] = useState('bg-white');
    const [colorArquivadas, setColorArquivadas] = useState('bg-white');
    const [mensagens, setMensagens] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mensagen, setMensagen] = useState({});
    const [mensagemAberta, setMensagemAberta] = useState('hidden');
    const [painelAberto, setPAinelAberto] = useState('block');
    const [formulario, setFormulario] = useState(false);
    const [resposta, setResposta] = useState('');

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

    function AbrirMensagem(id) {
        if (mensagens && mensagens.naoRespondidas.length > 0) {
            for (const item of mensagens.naoRespondidas) {
                if (item.id === id) {
                    setMensagen(item);
                    setPAinelAberto('hidden');
                    setMensagemAberta('flex flex-col');
                    return
                }
            }
        }

        if (mensagens && mensagens.respondidas.length > 0) {
            for (const item of mensagens.respondidas) {
                if (item.id === id) {
                    setMensagen(item);
                    setPAinelAberto('hidden');
                    setMensagemAberta('flex flex-col');
                    return
                }
            }
        }

        if (mensagens && mensagens.arquivadas.length > 0) {
            for (const item of mensagens.arquivadas) {
                if (item.id === id) {
                    setMensagen(item);
                    setPAinelAberto('hidden');
                    setMensagemAberta('flex flex-col');
                    return
                }
            }
        }
    }

    function fecharMensagem() {
        setMensagen({});
        setPAinelAberto('block');
        setMensagemAberta('hidden');
        setFormulario(false);
        setResposta('');
    }

    function Responder() {
        setFormulario(true);
    }

    async function Arquivar(id) {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('/api/arquivar',{id}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            Mensagens();
            setPAinelAberto('block');
            setMensagemAberta('hidden');

        } catch (error) {
            console.error('Ocorreu um erro ao arquivar a mensagem:', error);
        } 
    }

    async function Excluir(id) {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('/api/excluir-mensagem',{id}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            Mensagens();
            setPAinelAberto('block');
            setMensagemAberta('hidden');

        } catch (error) {
            console.error('Ocorreu um erro ao arquivar a mensagem:', error);
        } 
    }

    async function Enviar(e){
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('/api/responder',{mensagen, resposta}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            setFormulario(false);
            setResposta('');
            Mensagens();
            setPAinelAberto('block');
            setMensagemAberta('hidden');

        } catch (error) {
            console.error('Ocorreu um erro ao responder a mensagem:', error);
        } 
    }

    return (
        <>
            <NavAdmin />
            <div className="ml-64 p-4 flex flex-col">
                <h2 className="mx-auto mb-4 text-pink-500 text-2xl">Mensagens</h2>
                {loading ? <div>Carregando...</div> : <div className={painelAberto}>
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
                                        <th className="border border-black px-4 py-2">Data</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mensagens.naoRespondidas.map((mensagen) => (
                                        <tr key={mensagen.id} className="mb-2 cursor-pointer" onClick={() => AbrirMensagem(mensagen.id)}>
                                            <td className="border border-black px-4 py-2">{mensagen.nome}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.email}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.assunto}</td>
                                            <td className="border border-black px-4 py-2">{format(new Date(mensagen.data), 'dd/MM/yyyy')}</td>
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
                                        <th className="border border-black px-4 py-2">Data</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mensagens.respondidas.map((mensagen) => (
                                        <tr key={mensagen.id} className="mb-2 cursor-pointer" onClick={() => AbrirMensagem(mensagen.id)}>
                                            <td className="border border-black px-4 py-2">{mensagen.nome}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.email}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.assunto}</td>
                                            <td className="border border-black px-4 py-2">{format(new Date(mensagen.data), 'dd/MM/yyyy')}</td>
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
                                        <th className="border border-black px-4 py-2">Data</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mensagens.arquivadas.map((mensagen) => (
                                        <tr key={mensagen.id} className="mb-2 cursor-pointer" onClick={() => AbrirMensagem(mensagen.id)}>
                                            <td className="border border-black px-4 py-2">{mensagen.nome}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.email}</td>
                                            <td className="border border-black px-4 py-2">{mensagen.assunto}</td>
                                            <td className="border border-black px-4 py-2">{format(new Date(mensagen.data), 'dd/MM/yyyy')}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                        ) : (<p>Sem mensagens arquivadas.</p>)}
                    </div>
                </div>}
                <div>
                    {mensagen && (
                        <div className={`border border-black p-4 gap-2 ${mensagemAberta}`}>
                            <button className="ml-auto mr-0 text-xl" onClick={fecharMensagem}>x</button>
                            <p>{mensagen.email}</p>
                            <div className="flex gap-8 bg-gray-300 p-2">
                                <p>{mensagen.nome}</p>
                                <p>/</p>
                                <p>{mensagen.assunto}</p>
                            </div>
                            <pre className="whitespace-pre-wrap">{mensagen.mensagem}</pre>
                            <div className="flex mx-auto m-y-4 gap-8">
                                {(responder === 'flex flex-col' || arquivadas === 'flex flex-col') &&
                                    <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={Responder}>
                                        Responder
                                    </button>}
                                {(responder === 'flex flex-col') &&
                                    <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={() => Arquivar(mensagen.id)}>
                                        Arquirvar
                                    </button>}
                                <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={() => Excluir(mensagen.id)}>
                                    Excluir
                                </button>
                            </div>
                            {formulario && (
                                <form className="flex flex-col" onSubmit={Enviar}>
                                    <textarea
                                        className="my-4 h-64 p-2 border border-gray-500 rounded"
                                        value={resposta} 
                                        onChange={(e) => setResposta(e.target.value)}
                                    />
                                    <button type="submit" className="bg-gray-300 px-4 py-2 rounded-lg m-auto">Enviar</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}