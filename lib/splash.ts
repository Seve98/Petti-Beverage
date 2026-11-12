// Condiviso fra SplashScreen (client) e app/layout.tsx (server).
export const CHIAVE_SPLASH_VISTO = "petti_splash_seen";

/** Da mettere in <head>: segna <html> se lo splash è già stato visto, prima del primo disegno. */
export const SCRIPT_SPLASH_VISTO = `try{if(sessionStorage.getItem("${CHIAVE_SPLASH_VISTO}"))document.documentElement.dataset.splashVisto="1"}catch(e){}`;

/** Regola che nasconde lo splash già visto: inline in <head>, attiva dal primo disegno. */
export const STILE_SPLASH_VISTO = "html[data-splash-visto] #splash{display:none}";
