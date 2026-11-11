import Link from "next/link";
import { landingConfig } from "@/config/landing";

export function Footer() {
  const { footer } = landingConfig;
  // Solo se muestran enlaces con ruta real (ver `footer.links` en la configuración).
  const links = footer.links.filter((link): link is { label: string; href: string } => link.href !== null);

  return (
    <footer className="border-t border-line bg-night">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center gap-6 px-4 py-10 text-center sm:px-8 md:flex-row md:justify-between md:text-left lg:px-10">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-white">{footer.brand}</p>
          <p className="mt-1.5 text-sm text-muted">{footer.tagline}</p>
        </div>

        {links.length > 0 && (
          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="border-t border-line/60">
        <p className="mx-auto w-full max-w-[78rem] px-4 py-5 text-center text-xs text-white/40 sm:px-8 lg:px-10">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
