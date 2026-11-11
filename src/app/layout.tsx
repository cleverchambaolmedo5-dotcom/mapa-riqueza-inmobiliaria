import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Mapa de la Riqueza Inmobiliaria | Entrenamiento gratuito con Clever Chamba",
  description:
    "Tres clases gratuitas en vivo para preparar tu capital, identificar oportunidades inmobiliarias y comenzar a construir patrimonio, incluso con poco capital.",
};

export const viewport: Viewport = {
  themeColor: "#08080D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
