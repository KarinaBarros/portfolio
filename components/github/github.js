import './github.css'
import LottieAnimationGithub from "../lottie/github-lottie";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Github2() {
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [dados, setDados] = useState([]);
    const [meses, setMeses] = useState([]);

    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get('/api/github');
            console.log(response.data);
            setTotal(response.data.github.totalContributions);
            setDados(response.data.github.weeks);
            setMeses(response.data.meses);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function formatarData(data) {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return (
        loading ? (
            <LottieAnimationGithub />
        ) : (

            <div className='contribuicoes'>
                {total && (<div className='total'>
                    <h3>Contribuições do Github</h3>
                    <p>Dados atualizados em tempo real</p>
                </div>)}
                {dados.length > 0 && (<div className='container'>
                    {total && (<h4>{total} contribuições no último ano</h4>)}
                    <div className='container-grafico'>
                        <div className='meses'>
                            {meses.length > 0 && (
                                meses.map((mes, index) => (
                                    <p key={index}>{mes}</p>
                                ))
                            )}
                        </div>
                        <div className='grafico'>
                            <div className='semana'>
                                <p>Segunda</p>
                                <p>Quarta</p>
                                <p>Sexta</p>
                            </div>
                            {dados.map((coluna, index) => (
                                <div key={index} className={`coluna ${index === 0 && 'coluna1'}`}>
                                    {coluna.contributionDays.map(dia => (
                                        <div key={dia.date} className='dia'
                                            style={{ backgroundColor: dia.color }}
                                            title={dia.contributionCount === 0
                                                ? 'Nenhuma contribuição em ' + formatarData(dia.date)
                                                : dia.contributionCount === 1
                                                    ? dia.contributionCount + ' contribuição em ' + formatarData(dia.date)
                                                    : dia.contributionCount + ' contribuições em ' + formatarData(dia.date)}
                                        >
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='legenda'>
                        <p>Menos</p>
                        <div className='dia' style={{backgroundColor:'#ebedf0'}}></div>
                        <div className='dia' style={{backgroundColor:'#9be9a8'}}></div>
                        <div className='dia' style={{backgroundColor:'#40c463'}}></div>
                        <div className='dia' style={{backgroundColor:'#30a14e'}}></div>
                        <div className='dia' style={{backgroundColor:'#216e39'}}></div>
                        <p>Mais</p>
                    </div>
                    </div>
                </div>)}
            </div>
        )
    )
}