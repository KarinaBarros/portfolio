export const SEO = {
    title: 'Portfolio Karina Barros',
    description: 'Portfólio de Karina Barros, desenvolvedora full stack especializada em criar soluções web modernas e eficientes. Confira meus projetos e habilidades!',
    openGraph: {
      url: process.env.URL,
      title: 'Portfolio Karina Barros',
      description: 'Portfólio de Karina Barros, desenvolvedora full stack especializada em criar soluções web modernas e eficientes. Confira meus projetos e habilidades!',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/avatar.png`,
          width: 800,
          height: 600,
          alt: 'avatar Karina Barros',
        },
      ],
      site_name: 'Portfolio Karina Barros',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: 'desenvolvedora full stack, portfólio, Karina Barros, desenvolvimento web, projetos, programação, frontend, backend, portfolio desenvolvedor, desenvolvedor, programador, dev, portfolio dev',
      },
      {
        name: 'author',
        content: 'Karina Barros',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
  };
  
