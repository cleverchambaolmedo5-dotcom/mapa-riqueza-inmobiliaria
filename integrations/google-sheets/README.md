# Registros del formulario → Google Sheets

```
Formulario (navegador) → /api/leads (servidor Next.js) → Apps Script → Google Sheets
```

La URL del script y la clave secreta solo existen en el servidor; el navegador nunca las ve.

## 1. Crear la hoja

1. En Google Drive, crea una hoja de cálculo nueva (por ejemplo, «Registros – Mapa de la Riqueza»).
2. No hace falta crear columnas: el script crea la pestaña **Registros** con sus encabezados
   la primera vez que llega un registro.

## 2. Pegar el script

1. En la hoja: **Extensiones → Apps Script**.
2. Borra el contenido de `Código.gs` y pega el de [`Code.gs`](./Code.gs).
3. Cambia `SECRET` por una clave larga y aleatoria. Puedes generarla con:
   ```
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
4. Guarda (icono de disquete).

## 3. Publicar como aplicación web

1. **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. **Ejecutar como:** Yo (tu cuenta).
4. **Quién tiene acceso:** Cualquier usuario.
   (Es necesario para que el servidor pueda llamarlo; sin la clave secreta el script rechaza todo.)
5. **Implementar** y autoriza los permisos que pide Google.
6. Copia la **URL de la aplicación web** (termina en `/exec`).

> Si más adelante editas el script: **Implementar → Gestionar implementaciones → editar (lápiz) →
> Versión: Nueva versión**. Así la URL no cambia.

## 4. Variables de entorno de la landing

En local, crea `.env.local` en la raíz del proyecto (no se sube al repositorio):

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=la-misma-clave-que-pusiste-en-SECRET
```

En producción (Vercel, Hostinger Node.js, etc.) añade esas dos variables en el panel del hosting
y vuelve a desplegar.

Mientras falten, el formulario muestra «Integración pendiente» y no envía nada.

## Columnas que se guardan

| Columna | Contenido |
|---|---|
| Fecha (Ecuador) | Fecha y hora del registro (America/Guayaquil) |
| Nombre, WhatsApp, Correo | Datos del formulario (WhatsApp en formato internacional, p. ej. `+593991234567`) |
| País | Código ISO del país elegido en el selector |
| utm_source … utm_term | Campaña que trajo a la persona (vacío si llegó sin UTM) |
| Página / Referente | URL de llegada y sitio de procedencia |
| Duplicado | «Sí» si ese WhatsApp o correo ya estaba registrado |
| Navegador | User-Agent (útil para detectar registros falsos) |

## Protección incluida

- Validación de todos los campos en el servidor.
- Campo trampa invisible contra bots.
- Límite de 5 envíos cada 10 minutos por IP.
- Clave secreta compartida entre la landing y el script.
- Valores que empiezan por `= + - @` se guardan como texto (sin fórmulas).
