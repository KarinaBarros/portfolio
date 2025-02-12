import axios from "axios";

export default async function github(req, res) {
    const dataAtual = new Date();
    const dataInicial = new Date(dataAtual); // Cria uma cópia de dataAtual
    dataInicial.setFullYear(dataAtual.getFullYear() - 1);
   
    try {
        const query = `
        {
          user(login: "KarinaBarros") {
            contributionsCollection(from: "${dataInicial.toISOString()}", to: "${dataAtual.toISOString()}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `;

        const response = await axios.post('https://api.github.com/graphql',{ query }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GITHUB}`,
            },
        });
        let meses = [];

        while(dataInicial <= dataAtual){
          let mes = dataInicial.toLocaleString('pt-BR', {month: 'short'});
          mes =  mes.charAt(0).toUpperCase() + mes.slice(1).replace(/\.$/, "");
          meses.push(mes);
          dataInicial.setMonth(dataInicial.getMonth() + 1);
        }
        const data = {meses:meses, github:response.data.data.user.contributionsCollection.contributionCalendar}
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        res.status(error.response?.status || 500).json({ error: 'Erro ao buscar dados do GitHub' });
    }
}
