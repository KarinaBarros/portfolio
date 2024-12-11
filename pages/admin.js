import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const Admin = () => {
  
  const [error, setError] = useState('');
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
      } catch (err) {
        setError('Você não tem acesso a esta página');
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

 

  const [formData, setFormData] = useState({
    tema: '',
    autor: '',
    imagem: '',
    titulo: '',
    conteudo: '',
    classe: '',
    codigo: '',
    titulo2: '',
    conteudo2: '',
    classe2: '',
    codigo2: '',
    titulo3: '',
    conteudo3: '',
    classe3: '',
    codigo3: '',
    titulo4: '',
    conteudo4: '',
    classe4: '',
    codigo4: '',
    titulo5: '',
    conteudo5: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await axios.post('/api/admin', formData);
        
        alert(response.data.message);
        window.location.reload();
    } catch (error) {
        alert(error.response?.data?.error);
    } finally{
        setLoading(false);
    }
};

  return (
    <div>
        <Head>
        <title>Admin</title>
        <meta name="description" content="pagina para inserir posts." />
        </Head>
        <Link href='/aprovar-comentarios'>Aprovar comentários</Link>
        {(error) ? (<div>Você não tem acesso a essa página.</div>) : (
            <div className="admin">
            <h2>Inserir Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tema</label>
                    <select name="tema" value={formData.tema} onChange={handleChange} required>
                        <option></option>
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="javascript">javascript</option>
                        <option value="outros">outros</option>
                    </select>
                </div>
                <div>
                    <label>Autor</label>
                    <input name="autor" value={formData.autor} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Imagem</label>
                    <select name="imagem" value={formData.imagem} onChange={handleChange} required>
                        <option></option>
                        <option value="/imagem.png">imagem</option>
                        <option value="/html.png">imagem html</option>
                        <option value="/css.png">imagem css</option>
                        <option value="/javascript.png">imagem javascript</option>
                    </select>
                </div>
                <div>
                    <p>O titulo será exibido na url.</p>
                    <label>Título</label>
                    <input name="titulo" value={formData.titulo} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Conteúdo</label>
                    <textarea name="conteudo" value={formData.conteudo} onChange={handleChange} />
                </div>
                <div>
                    <label>Classe</label>
                    <select name="classe" value={formData.classe} onChange={handleChange}> 
                        <option>Selecione uma classe</option>
                        <option value="language-javascript">javascript</option>
                        <option value="language-css">css</option>
                        <option value="language-html">html</option>
                    </select>
                </div>
                <div>
                    <label>Código</label>
                    <textarea name="codigo" value={formData.codigo} onChange={handleChange} />
                </div>
                <div>
                    <label>Título 2</label>
                    <input name="titulo2" value={formData.titulo2} onChange={handleChange} />
                </div>
                <div>
                    <label>Conteúdo 2</label>
                    <textarea name="conteudo2" value={formData.conteudo2} onChange={handleChange} />
                </div>
                <div>
                    <label>Classe 2</label>
                    <select name="classe2" value={formData.classe2} onChange={handleChange}> 
                        <option>Selecione uma classe</option>
                        <option value="language-javascript">javascript</option>
                        <option value="language-css">css</option>
                        <option value="language-html">html</option>
                    </select>
                </div>
                <div>
                    <label>Código 2</label>
                    <textarea name="codigo2" value={formData.codigo2} onChange={handleChange} />
                </div>
                <div>
                    <label>Título 3</label>
                    <input name="titulo3" value={formData.titulo3} onChange={handleChange} />
                </div>
                <div>
                    <label>Conteúdo 3</label>
                    <textarea name="conteudo3" value={formData.conteudo3} onChange={handleChange} />
                </div>
                <div>
                    <label>Classe 3</label>
                    <select name="classe3" value={formData.classe3} onChange={handleChange}> 
                        <option>Selecione uma classe</option>
                        <option value="language-javascript">javascript</option>
                        <option value="language-css">css</option>
                        <option value="language-html">html</option>
                    </select>
                </div>
                <div>
                    <label>Código 3</label>
                    <textarea name="codigo3" value={formData.codigo3} onChange={handleChange} />
                </div>
                <div>
                    <label>Título 4</label>
                    <input name="titulo4" value={formData.titulo4} onChange={handleChange} />
                </div>
                <div>
                    <label>Conteúdo 4</label>
                    <textarea name="conteudo4" value={formData.conteudo4} onChange={handleChange} />
                </div>
                <div>
                    <label>Classe 4</label>
                    <select name="classe4" value={formData.classe4} onChange={handleChange}> 
                        <option>Selecione uma classe</option>
                        <option value="language-javascript">javascript</option>
                        <option value="language-css">css</option>
                        <option value="language-html">html</option>
                    </select>
                </div>
                <div>
                    <label>Código 4</label>
                    <textarea name="codigo4" value={formData.codigo4} onChange={handleChange} />
                </div>
                <div>
                    <label>Título 5</label>
                    <input name="titulo5" value={formData.titulo5} onChange={handleChange} />
                </div>
                <div>
                    <label>Conteúdo 5</label>
                    <textarea name="conteudo5" value={formData.conteudo5} onChange={handleChange} />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
            </form>
            <button onClick={handleLogout}>Sair</button>
        </div>
        )}
    </div>
  )
};

export default Admin;
