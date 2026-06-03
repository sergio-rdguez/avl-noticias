# Supabase + Vercel (gratis)

AVL Noticias usa **Vercel** para la web y **Supabase** para noticias y tablón del mercado. Solo pagas el dominio.

## 1. Crear proyecto Supabase

1. [supabase.com](https://supabase.com) → **New project** (plan free).
2. Guarda la contraseña de la base de datos.

## 2. Crear tablas

En **SQL Editor**, pega y ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql).

## 3. Claves API

**Project Settings → API**:

- **Project URL** → `supabaseUrl`
- **anon public** → `supabaseAnonKey` (segura en el front con RLS activo)

## 4. Configurar Angular (local)

Edita [`src/environments/environment.ts`](src/environments/environment.ts):

```ts
supabaseUrl: 'https://xxxxx.supabase.co',
supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
```

Referencia: [`src/environments/environment.example.ts`](src/environments/environment.example.ts).

```bash
npm start
```

Sin artículos verás un mensaje para crear el primero en Supabase.

## 5. Publicar tu primera noticia

**Table Editor → articles → Insert row**

| Campo | Ejemplo |
|--------|---------|
| slug | `mi-primera-noticia` |
| title | Título de la noticia |
| excerpt | Entradilla corta |
| category | `Mercado` |
| kicker | `Última hora` |
| author | Tu nombre |
| author_initials | `AV` |
| updated_label | `Hace 5 min` |
| read_minutes | `4` |
| featured | `true` (solo uno en portada) |
| published | `true` |
| body | Ver JSON abajo |

### Ejemplo de `body` (JSON)

```json
[
  { "type": "p", "text": "Primer párrafo como lede de la noticia." },
  { "type": "figure", "caption": "Pie de foto", "placeholder": "FOTO 16:9", "imageUrl": "https://..." },
  { "type": "p", "text": "Segundo párrafo del artículo." },
  { "type": "h2", "text": "Subtítulo" },
  { "type": "p", "text": "Más contenido." },
  { "type": "ad", "slot": "in-article-slot" }
]
```

La URL será: `/article/mi-primera-noticia`

## 6. Tablón del mercado (opcional)

**Table Editor → market_ticker → Insert row**

- `tag`: Hecho / Rumor / Avanza
- `headline`: texto del rumor
- `time_label`: `12:04`
- `sort_order`: 0, 1, 2…
- `active`: true

## 7. Imágenes (Storage)

1. **Storage → New bucket** → nombre `images` → **Public bucket**.
2. Sube una imagen → copia la URL pública.
3. Ponla en `image_url` del artículo o en `imageUrl` dentro de un bloque `figure`.

## 8. Vercel

En el proyecto de Vercel → **Settings → Environment Variables**:

| Variable | Valor |
|----------|--------|
| `SUPABASE_URL` | URL del proyecto |
| `SUPABASE_ANON_KEY` | anon key |
| `SITE_URL` | `https://avlnoticias.com` (opcional) |

El build ejecuta `scripts/set-env.js` y genera `environment.prod.ts` automáticamente.

## 9. Escribir desde fuera (futuro)

- Panel de Supabase (Table Editor).
- Supabase Studio en móvil.
- Más adelante: mini panel con auth solo para redactores (misma BD).

## Seguridad

- RLS permite **solo lectura pública** de filas `published = true`.
- No subas la **service_role** key al front ni a Vercel como variable pública.
- La **anon key** en el cliente es correcta con RLS activo.
