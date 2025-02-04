import { NextSeo } from "next-seo";

const BlogSEO = () => {
    const fullUrl = `${process.env.NEXT_PUBLIC_URL}/blog}`;
    const fullImageUrl =`${process.env.NEXT_PUBLIC_URL}/avatar.png`;
  
    return (
      <NextSeo
        title='Blog Karina Barros'
        description='Aprenda sobre programação, desenvolvimento web, HTML, CSS, JavaScript e muito mais. Tutoriais, dicas para iniciantes e profissionais.'
        canonical={fullUrl}
        openGraph={{
          url: fullUrl,
          title: 'Blog Karina Barros',
          description: 'Aprenda sobre programação, desenvolvimento web, HTML, CSS, JavaScript e muito mais. Tutoriais, dicas para iniciantes e profissionais.',
          images: [
            {
              url: fullImageUrl,
              width: 1200,
              height: 630,
              alt: 'avatar Karina Barros',
            },
          ],
          site_name: 'Blog Karina Barros',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'programação, desenvolvimento web, HTML, CSS, JavaScript, tutoriais, dicas de programação, frontend, backend, Karina Barros',
          },
          {
            name: 'author',
            content: 'Karina Barros',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'og:type',
            content: 'website',
          },
          {
            name: 'og:locale',
            content: 'pt_BR',
          },
        ]}
      />
    );
  };
  
  export default BlogSEO;