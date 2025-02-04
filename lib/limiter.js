let ipRequests = {};  // Armazenar contagem de requisições por IP
const LIMITE = 5; // Limite de requisições
const INTERVALO =5 * 60 * 1000; // Intervalo de 5 minutos

export function Limiter(req, res) {
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  // Inicializa a contagem de requisições para o IP se não existir
  if (!ipRequests[ip]) {
    ipRequests[ip] = { count: 0, timestamp: Date.now() };
  }

  const now = Date.now();
  const timeDifference = now - ipRequests[ip].timestamp;

  // Se passou mais de 5 minutos desde a última requisição, resetar a contagem
  if (timeDifference > INTERVALO) {
    ipRequests[ip] = { count: 1, timestamp: now };  // Primeira requisição após o intervalo
  } else {
    ipRequests[ip].count += 1;
  }

  // Verificar se o limite de requisições foi excedido
  if (ipRequests[ip].count > LIMITE) {
    res.status(429).json({ message: 'Limite de requisições excedido. Tente novamente em breve.' });
    return true;
  }

  return false;
}