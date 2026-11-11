/**
 * Configuración en JavaScript (no TypeScript) para que Next.js no necesite compilarla con SWC:
 * en el entorno de build de Hostinger (GLIBC 2.28) el binario nativo de SWC no se puede cargar,
 * por eso el build usa `next build --webpack` (Turbopack exige el binario nativo).
 * Tailwind se procesa con PostCSS (postcss.config.mjs).
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
