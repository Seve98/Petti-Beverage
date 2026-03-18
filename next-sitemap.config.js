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
  transform: async (config, path) => {
    let priority = 0.7; // Default
    
    if (path === '/') {
      priority = 1.0; // La Home è la priorità massima
    } else if (path.startsWith('/products')) {
      priority = 0.8; // I prodotti sono molto importanti
    } else if (path === '/chi-siamo' || path === '/business') {
      priority = 0.6; // Pagine informative
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    }
  },
};
