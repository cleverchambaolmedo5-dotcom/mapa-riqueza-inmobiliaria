# El Mapa de la Riqueza Inmobiliaria · Landing de captación

Landing de registro al entrenamiento gratuito de Clever Chamba.
**Fase actual: solo la primera pantalla (Hero).**

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript estricto
- Tailwind CSS 4 · ESLint 9 (`eslint-config-next`)
- Tipografía: Plus Jakarta Sans (`next/font/google`)

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Estructura

```text
public/images/clever-chamba.png   Fotografía del experto
src/app/                          layout, página y estilos globales (tokens de color)
src/components/hero/              Hero, HeroHeading, ExpertProfile, LeadForm, TrainingSchedule
src/components/ui/                Button, Input
src/config/landing.ts             TODOS los textos, cifras, fechas y países editables
src/lib/validation.ts             Validación y normalización del formulario
src/lib/lead-submission.ts        Punto de conexión con el CRM (pendiente)
```

## Contenido editable

Titular, subtítulo, cifras de autoridad, fechas, horario y lista de códigos de país
se modifican en `src/config/landing.ts`. Para mostrar el espacio provisional de la
fotografía, poner `expert.photo` en `null`.

## Integración con CRM (pendiente)

El formulario valida nombre, WhatsApp (código de país + número, se normaliza a E.164)
y correo, pero **no envía datos** todavía.

- `landingConfig.leadCapture.endpoint` es `null` → `submitLead()` devuelve
  `not_configured` y el formulario muestra un aviso de "integración pendiente"
  (no hay mensaje de éxito falso).
- Para conectar Kommo, FunnelChat u otro sistema, ver los pasos documentados en
  `src/lib/lead-submission.ts`. Recomendado: una Route Handler propia
  (`src/app/api/leads/route.ts`) con las credenciales en variables de entorno del servidor.

Payload que recibirá el endpoint:

```json
{ "fullName": "María López", "whatsapp": "+593991234567", "email": "maria@correo.com" }
```
