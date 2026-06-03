/**
 * Escribe environment.prod.ts desde variables de entorno (Vercel CI).
 * Uso: SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/set-env.js
 */
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

const siteUrl = process.env.SITE_URL || 'https://avlnoticias.com';
const adsense = process.env.ADSENSE_CLIENT_ID || '';
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const content = `export const environment = {
  production: true,
  siteUrl: '${siteUrl}',
  siteName: 'AVL Noticias',
  adsenseClientId: '${adsense}',
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}',
};
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('environment.prod.ts generado (Supabase:', supabaseUrl ? 'sí' : 'no', ')');
