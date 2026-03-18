/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pettibeverage.com', // Il tuo dominio reale
  generateRobotsTxt: true, // Crea anche il file robots.txt per te
  generateIndexSitemap: false,
  exclude: [
    '/admin', 
    '/admin/*', 
    '/checkout', 
    '/success', 
    '/api/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/checkout', '/success'], // Dice a Google di non entrare in queste cartelle
      },
    ],
  },
};
