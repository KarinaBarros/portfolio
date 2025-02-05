import { NextSeo } from "next-seo";

const PostSEO = ({ title, description, slug, image, tags }) => {

  const fullUrl = `${process.env.NEXT_PUBLIC_URL}/blog/${slug}`;
  const fullImageUrl = `${process.env.NEXT_PUBLIC_URL}/blog${image}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={fullUrl}
      openGraph={{
        url: fullUrl,
        title: title,
        description: description,
        images: [
          {
            url: fullImageUrl,
            width: 1200,
            height: 630,
            alt: 'imagem relacionada a programação',
          },
        ],
        site_name: 'Blog Karina Barros',
        type: 'article',
        locale: 'pt_BR',
      }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: tags,
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
          name: 'og:locale',
          content: 'pt_BR',
        },
      ]}
    />
  );
};

export default PostSEO;
