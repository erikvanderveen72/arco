import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import "./globals.css";

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: "EnergieVergelijker | Vergelijk energietarieven in Nederland",
  description:
    "Vergelijk actuele energietarieven van alle Nederlandse leveranciers. Bespaar op stroom en gas met onze onafhankelijke vergelijker.",
  keywords: ["energie vergelijken", "stroom", "gas", "energieleverancier", "Nederland"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Header />
          {children}
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} EnergieVergelijker. Alle tarieven zijn indicatief.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
