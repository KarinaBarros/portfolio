import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './github.css'
import LottieAnimationGithub from "../lottie/github-lottie";

export default function Github() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/github');

                // Formatar os dados para incluir porcentagens
                const formattedData = Object.entries(response.data).map(([language, percentage]) => ({
                    language,
                    percentage: parseFloat(percentage), // manter como número para facilitar a renderização
                }));

                setChartData(formattedData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className = 'github'> 
            <h2>Distribuição de Linguagens no GitHub</h2>
            {chartData.length>0 ? (
              <ResponsiveContainer>
              <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="language" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentagem']} />
                  <Legend />
                  <Bar dataKey="percentage" fill="#312fb8" name="Porcentagem de Linguagens"/>
              </BarChart>
              </ResponsiveContainer>
            ): <div>
                    <LottieAnimationGithub/>
                </div>}
            
        </div>
    );
}
