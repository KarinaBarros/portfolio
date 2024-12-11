import axios from "axios";

export default async function github(req, res) {
    try {
        // Obter todos os repositórios do usuário
        const reposResponse = await axios.get('https://api.github.com/users/KarinaBarros/repos', {
            headers: {
                Authorization: `token ${process.env.GITHUB}`,
                Accept: 'application/vnd.github.v3+json', // Define a versão da API que você está usando
            },
        });

        const repos = reposResponse.data;
        const languagesData = {};

        // Iterar sobre todos os repositórios para obter as linguagens
        for (const repo of repos) {
            const languageResponse = await axios.get(`https://api.github.com/repos/KarinaBarros/${repo.name}/languages`, {
                headers: {
                    Authorization: `token ${process.env.GITHUB}`,
                    Accept: 'application/vnd.github.v3+json', // Define a versão da API que você está usando
                },
            });

            const languages = languageResponse.data;

            // Agregar os dados das linguagens
            for (const [language, bytes] of Object.entries(languages)) {
                if (languagesData[language]) {
                    languagesData[language] += bytes;
                } else {
                    languagesData[language] = bytes;
                }
            }
        }

        // Calcular o total de bytes
        const totalBytes = Object.values(languagesData).reduce((acc, value) => acc + value, 0);

        // Calcular a porcentagem para cada linguagem
        const percentages = {};
        for (const [language, bytes] of Object.entries(languagesData)) {
            percentages[language] = ((bytes / totalBytes) * 100).toFixed(2); // Arredondar para duas casas decimais
        }

        // Retorne os dados agregados em porcentagens
        res.status(200).json(percentages);
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        res.status(error.response?.status || 500).json({ error: 'Erro ao buscar dados do GitHub' });
    }
}
