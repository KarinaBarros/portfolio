/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_URL
module.exports = {
    siteUrl: siteUrl, 
    generateRobotsTxt: true, // Gera o robots.txt
    exclude: ['/admin/*', '/api/*', '/login'], // Exclui rotas privadas
    generateIndexSitemap: false, // Define se haverá um index sitemap
  };
  