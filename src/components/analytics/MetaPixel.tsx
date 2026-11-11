import Script from "next/script";

/**
 * Meta Pixel (código base oficial) + evento estándar PageView.
 *
 * El ID se lee de NEXT_PUBLIC_META_PIXEL_ID. Al ser `NEXT_PUBLIC_*`, Next.js lo
 * incrusta en el build: en producción la variable debe existir ANTES de compilar.
 * Sin variable (o con un valor no numérico) no se carga nada.
 *
 * Una sola inicialización:
 *  - `<Script id>` hace que Next.js inyecte el bloque una única vez por carga de página.
 *  - La marca `__metaPixelInitialized` evita repetir `init`/`PageView` si el bloque
 *    llegara a ejecutarse de nuevo (remontajes, Strict Mode en desarrollo).
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const isValidPixelId = /^\d{6,20}$/.test(PIXEL_ID);

export function MetaPixel() {
  if (!isValidPixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
if (!window.__metaPixelInitialized) {
  window.__metaPixelInitialized = true;
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${PIXEL_ID}');
  fbq('track', 'PageView');
}
`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- píxel de seguimiento oficial sin JavaScript */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
