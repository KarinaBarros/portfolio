import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { SEO } from '@/lib/seo';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default App;
