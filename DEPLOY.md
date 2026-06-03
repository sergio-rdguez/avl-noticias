# Despliegue en Vercel

## Requisitos

- Cuenta en [GitHub](https://github.com) o GitLab
- Cuenta en [Vercel](https://vercel.com)

## Variables de entorno (Vercel)

| Nombre | Descripción |
|--------|-------------|
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_ANON_KEY` | Clave anon (pública) |
| `SITE_URL` | `https://avlnoticias.com` (opcional) |

Configura Supabase antes del deploy: ver [SUPABASE.md](SUPABASE.md).

## Pasos

1. Inicializa git y sube el proyecto (desde `avl-noticias`):

   ```bash
   git init
   git add .
   git commit -m "AVL Noticias: sitio Angular con portada, artículos y legales"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/avl-noticias.git
   git push -u origin main
   ```

2. En Vercel: **Add New Project** → importa el repositorio.
3. Vercel detectará `vercel.json` con:
   - `buildCommand`: `npm run build`
   - `outputDirectory`: `dist/avl-noticias/browser`
   - Rewrites SPA para Angular Router
4. Tras el primer deploy, en **Settings → Domains** añade `avlnoticias.com`.
5. Configura en tu registrador los DNS que indique Vercel (registros A/CNAME).
6. Actualiza `siteUrl` en `src/environments/environment.prod.ts` si usas otro dominio.

## Dominio y DNS

La compra del dominio y los registros DNS se gestionan en el panel del registrador y en Vercel; no forman parte del código del repositorio.
