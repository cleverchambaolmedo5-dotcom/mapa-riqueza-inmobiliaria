# Meta Pixel

- **Pixel ID:** `826582405804465`
- **Eventos:** solo `PageView` (una vez por carga de página).
- **Código:** `src/components/analytics/MetaPixel.tsx`, montado en `src/app/layout.tsx`
  con `next/script` y estrategia `afterInteractive`.

## Variable de entorno

```
NEXT_PUBLIC_META_PIXEL_ID=826582405804465
```

- **Local:** ya está en `.env.local`.
- **Producción (Hostinger → Node.js → Variables de entorno):** añadir la misma variable.

> **Importante:** las variables `NEXT_PUBLIC_*` se incrustan en el código **al compilar**.
> En producción la variable debe existir **antes** del build; si se añade o cambia después,
> hay que volver a desplegar/compilar. Sin la variable, el Pixel simplemente no se carga.
>
> En Hostinger, «Reemplazar variables» sustituye el conjunto completo: al añadir esta,
> conserva también `GOOGLE_SHEETS_WEBHOOK_URL` y `GOOGLE_SHEETS_WEBHOOK_SECRET`.

## Cómo verificarlo con Meta Pixel Helper

1. Instala la extensión **Meta Pixel Helper** en Chrome
   (Chrome Web Store → «Meta Pixel Helper»).
2. Abre la landing publicada y pulsa el icono de la extensión.
3. Debe aparecer **un** píxel con ID **826582405804465** y el evento **PageView** con
   check verde, **una sola vez**.
4. Recarga la página: vuelve a aparecer un único PageView (uno por carga es lo correcto).

Comprobación adicional en Meta:
**Administrador de eventos → tu píxel → Probar eventos**, introduce la URL de la landing y
ábrela: el PageView aparece en tiempo real.

Si Pixel Helper no detecta nada: revisa que la variable estuviera configurada antes del
build y que no haya un bloqueador de anuncios activo en el navegador.
