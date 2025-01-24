import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Configurando o rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 10, // Máximo de 10 requisições
  duration: 60, // Janela de tempo de 60 segundos
});

export default async function middleware(req) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1";

  try {
    // Consumir 1 ponto do IP atual
    await rateLimiter.consume(ip);

    // Continuar com a requisição se o limite não foi atingido
    return NextResponse.next();
  } catch (err) {
    // Se o limite foi atingido, retornar uma mensagem de erro
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
}

// Definir para quais rotas o middleware será aplicado
export const config = {
  matcher: "/api/:path*", // Aplica apenas às rotas da API
};