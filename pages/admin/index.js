import Head from 'next/head';
import '@/app/globals.css';
import NavAdmin from '@/components/nav-admin/nav-admin';

const Admin = () => {
  return (
    <div>
        <Head>
        <title>Admin</title>
        <meta name="description" content="pagina para inserir posts." />
        </Head>
        <NavAdmin/>
        <div className='ml-64 p-8 flex flex-col'>
          Admin
        </div>
    </div>
  )
};

export default Admin;
