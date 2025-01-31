import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [authenticated, setAuthenticated] = useState(false); // Estado de autenticação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.get('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuthenticated(true); // Definir como autenticado
      } catch (err) {
        setAuthenticated(false); // Caso falhe, manter não autenticado
        router.push('/login');
      } finally {
        setLoading(false); // Finaliza o carregamento independentemente do sucesso ou falha
      }
    };

    fetchData();
  }, [router]);

  // Se ainda estiver carregando, exibe um carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!authenticated) {
    return null;
  }

  return (
    <div>
      {children} {/* Renderiza o conteúdo da página */}
    </div>
  );
}
