import { authenticate } from "@/lib/auth";
import axios from "axios";

async function Deploy(req, res) {
    try {
        const response = await axios.post(process.env.URL_REDEPLOY);
        const id = response.data.job.id;
        console.log(id);
        res.status(200).json({ message: 'Deploy iniciado!' }); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer deploy');
      }
}

export default authenticate(Deploy);