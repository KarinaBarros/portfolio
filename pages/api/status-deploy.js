import { authenticate } from "@/lib/auth";
import axios from "axios";

async function StatusDeploy(req, res) {
    try {
        const response = await axios.get(`https://api.vercel.com/v6/deployments?teamId=${process.env.TEAM_ID}`, {
            headers: {
              Authorization: `Bearer ${process.env.TOKEN_VERCEL}`,
            },
          });
          const status = response.data.deployments[0].state;
          res.json(status);
          console.log(status);
        
      } catch (error) {
        res.status(500).send('Erro ao obter status');
      }
}

export default authenticate(StatusDeploy);