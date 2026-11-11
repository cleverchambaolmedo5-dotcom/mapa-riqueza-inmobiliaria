import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { landingConfig } from "@/config/landing";

const { privacy, program } = landingConfig;
const { controller } = privacy;

export const metadata: Metadata = {
  title: `Política de privacidad | ${controller.brand}`,
  description: `Cómo ${controller.brand} trata los datos personales de las personas que se registran en ${program.name}.`,
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-field pt-8 first:border-t-0 first:pt-0">
      <h2 id={id} className="text-lg font-extrabold tracking-[-0.01em] text-ink sm:text-xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5 marker:text-electric [list-style:disc]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  const contact = controller.contactEmail ? (
    <>
      escribiendo a{" "}
      <a href={`mailto:${controller.contactEmail}`} className="font-semibold text-electric hover:underline">
        {controller.contactEmail}
      </a>
    </>
  ) : (
    <>respondiendo por el mismo canal (WhatsApp o correo electrónico) por el que te contactemos</>
  );

  return (
    <>
      <header className="border-b border-line bg-night">
        <div className="mx-auto flex w-full max-w-[78rem] items-center justify-between gap-4 px-4 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="text-sm font-extrabold uppercase tracking-[0.2em] text-white">
            {controller.brand}
          </Link>
          <Link
            href={`/#${landingConfig.form.anchorId}`}
            className="text-sm font-semibold text-muted transition-colors hover:text-white"
          >
            ← Volver al registro
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-surface">
        <div className="mx-auto w-full max-w-[48rem] px-4 py-14 sm:px-8 lg:py-20">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-electric">{program.name}</p>
          <h1 className="mt-3 text-[1.875rem] font-extrabold uppercase leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.25rem]">
            Política de privacidad
          </h1>
          <p className="mt-4 text-sm text-ink-soft">Última actualización: {privacy.lastUpdated}</p>

          <div className="mt-10 space-y-8 rounded-[1.25rem] border border-field bg-white p-6 sm:p-10">
            <p className="text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
              En {controller.brand} respetamos tu privacidad. Esta política explica qué datos personales recogemos
              cuando te registras en el entrenamiento gratuito <strong className="text-ink">{program.name}</strong>,
              para qué los usamos y qué derechos tienes sobre ellos, conforme a la Ley Orgánica de Protección de Datos
              Personales del Ecuador y demás normativa aplicable.
            </p>

            <Section id="responsable" title="1. Responsable del tratamiento">
              <p>
                El responsable del tratamiento de tus datos es <strong>{controller.legalName ?? controller.brand}</strong>
                {controller.legalName && controller.legalName !== controller.brand && <> ({controller.brand})</>}
                {controller.taxId && <>, con RUC {controller.taxId}</>}
                {controller.address && <>, con domicilio en {controller.address}</>}.
              </p>
              {controller.contactEmail && (
                <p>
                  Para cualquier consulta sobre esta política puedes escribir a{" "}
                  <a href={`mailto:${controller.contactEmail}`} className="font-semibold text-electric hover:underline">
                    {controller.contactEmail}
                  </a>
                  .
                </p>
              )}
            </Section>

            <Section id="datos" title="2. Qué datos recogemos">
              <p>Cuando completas el formulario de registro recogemos:</p>
              <List
                items={[
                  <>
                    <strong>Datos que nos das:</strong> nombre completo, número de WhatsApp (con código de país) y
                    correo electrónico.
                  </>,
                  <>
                    <strong>Datos de origen del registro:</strong> el país que eliges en el selector, la página desde la
                    que te registras, el sitio web del que llegaste y, si existen, los parámetros de la campaña
                    publicitaria (UTM) del enlace.
                  </>,
                  <>
                    <strong>Datos técnicos:</strong> el tipo de navegador y dispositivo. Tu dirección IP se usa solo
                    de forma momentánea para limitar envíos abusivos y no se guarda junto a tu registro.
                  </>,
                ]}
              />
              <p>No solicitamos datos sensibles ni información financiera.</p>
            </Section>

            <Section id="finalidades" title="3. Para qué usamos tus datos">
              <List
                items={[
                  "Gestionar tu registro y darte acceso a las clases gratuitas en vivo.",
                  "Enviarte por WhatsApp y correo electrónico los enlaces de acceso, recordatorios y materiales del entrenamiento.",
                  `Informarte sobre otros programas, mentorías y servicios de ${controller.brand} relacionados con la educación financiera y la inversión inmobiliaria.`,
                  "Conocer qué campañas y canales nos traen registros, para mejorar nuestra comunicación.",
                  "Detectar y evitar registros falsos, spam o usos fraudulentos del formulario.",
                ]}
              />
            </Section>

            <Section id="base-legal" title="4. Base legal">
              <p>
                Tratamos tus datos con base en tu <strong>consentimiento</strong>, que otorgas al enviar el formulario de
                registro. Puedes retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento
                realizado antes de retirarlo.
              </p>
            </Section>

            <Section id="destinatarios" title="5. Con quién compartimos tus datos">
              <p>
                <strong>No vendemos ni alquilamos tus datos personales.</strong> Solo los compartimos con proveedores
                tecnológicos que nos ayudan a prestar el servicio y que actúan siguiendo nuestras instrucciones, como
                Google (almacenamiento de los registros en Google Sheets), el proveedor de alojamiento de esta página y
                las herramientas que usamos para comunicarnos contigo por WhatsApp y correo electrónico.
              </p>
              <p>También podremos comunicarlos a autoridades competentes cuando una norma legal lo exija.</p>
            </Section>

            <Section id="transferencias" title="6. Transferencias internacionales">
              <p>
                Algunos de estos proveedores, como Google, pueden almacenar la información en servidores ubicados fuera
                del Ecuador. En esos casos procuramos trabajar con proveedores que ofrecen garantías adecuadas de
                protección de datos.
              </p>
            </Section>

            <Section id="conservacion" title="7. Cuánto tiempo conservamos tus datos">
              <p>
                Conservamos tus datos mientras sean necesarios para las finalidades descritas o hasta que solicites su
                eliminación, salvo que una obligación legal nos exija conservarlos durante más tiempo.
              </p>
            </Section>

            <Section id="seguridad" title="8. Seguridad">
              <p>
                Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: la información viaja
                cifrada, las credenciales de acceso se guardan solo en nuestros servidores y el acceso a los registros
                está limitado a las personas que los necesitan para su trabajo.
              </p>
            </Section>

            <Section id="derechos" title="9. Tus derechos">
              <p>En cualquier momento puedes ejercer tus derechos de:</p>
              <List
                items={[
                  "Acceso: saber qué datos tuyos tenemos.",
                  "Rectificación y actualización: corregir datos inexactos o incompletos.",
                  "Eliminación: pedir que borremos tus datos.",
                  "Oposición y suspensión del tratamiento: pedir que dejemos de usarlos para alguna finalidad, por ejemplo, para enviarte información comercial.",
                  "Portabilidad: recibir tus datos en un formato estructurado.",
                ]}
              />
              <p>Para ejercerlos puedes contactarnos {contact}, indicando tu nombre y el derecho que deseas ejercer.</p>
              <p>
                Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar un reclamo ante la
                Superintendencia de Protección de Datos Personales del Ecuador.
              </p>
            </Section>

            <Section id="baja" title="10. Dejar de recibir mensajes">
              <p>
                Si no deseas seguir recibiendo mensajes nuestros, puedes indicárnoslo en cualquier momento respondiendo
                al mensaje de WhatsApp o correo electrónico que recibas. Dejaremos de enviarte comunicaciones
                comerciales.
              </p>
            </Section>

            <Section id="menores" title="11. Menores de edad">
              <p>
                El entrenamiento está dirigido a personas mayores de 18 años. No recogemos de forma consciente datos de
                menores de edad; si detectamos un registro de un menor, lo eliminaremos.
              </p>
            </Section>

            <Section id="cookies" title="12. Cookies y almacenamiento en el navegador">
              <p>
                Esta página no utiliza cookies publicitarias ni de analítica. Solo guarda temporalmente en tu navegador
                (almacenamiento de sesión) los parámetros de la campaña por la que llegaste, para asociarlos a tu
                registro. Esa información se borra al cerrar la pestaña.
              </p>
            </Section>

            <Section id="cambios" title="13. Cambios en esta política">
              <p>
                Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. Publicaremos
                cualquier cambio en esta misma página, indicando la fecha de la última actualización.
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
