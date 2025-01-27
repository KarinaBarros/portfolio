import { authenticate } from "@/lib/auth";
import connectDB from "./connect";

async function Mensagens(req, res) {
    try {
        const connection = await connectDB();
        const mensagens = await connection`SELECT * FROM mensagens`;
        let naoRespondidas =[];
        let respondidas = [];
        let arquivadas = [];

        if(mensagens.length > 0){
          mensagens.forEach(mensagen => {
            if(mensagen.status === 'nao-respondida'){
              naoRespondidas.push(mensagen);
            } else if(mensagen.status === 'respondida'){
              respondidas.push(mensagen)
            } else if(mensagen.status === 'arquivada'){
              arquivadas.push(mensagen);
            }
          })
        }

        const mensagensFiltradas = {
          naoRespondidas : naoRespondidas,
          respondidas: respondidas,
          arquivadas: arquivadas
        }

        res.json(mensagensFiltradas); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os comentarios');
      }
}

export default authenticate(Mensagens);