# Google AdSense — activación

1. Publica el sitio en Vercel con dominio propio y contenido legal enlazado.
2. Asegúrate de tener al menos 15 artículos publicados (ver `public/assets/articles.json`).
3. En [Google AdSense](https://www.google.com/adsense/) solicita la revisión del sitio.
4. Cuando obtengas el **client ID**, edita `src/environments/environment.prod.ts`:

   ```ts
   adsenseClientId: 'ca-pub-XXXXXXXXXXXXXXXX',
   ```

5. Añade el script en `src/index.html` dentro de `<head>`:

   ```html
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"
   ></script>
   ```

6. Opcional: pasa `[adsenseSlot]="'TU_SLOT_ID'"` a cada `<app-ad-banner>` cuando tengas unidades creadas en AdSense.

Mientras `adsenseClientId` esté vacío, la app muestra placeholders editoriales.
