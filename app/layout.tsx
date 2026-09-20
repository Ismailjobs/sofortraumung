import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Räumung & Entrümpelung Wien | SofortRäumung",
    template: "%s",
  },
  description:
    "Professionelle Räumung und Entrümpelung in Wien & Niederösterreich zum Festpreis. Wohnungsauflösung, Verlassenschaft und besenreine Übergabe.",
  openGraph: {
    locale: SITE.locale,
    siteName: SITE.name,
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de-AT">
      <body className="min-h-screen bg-navy text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
