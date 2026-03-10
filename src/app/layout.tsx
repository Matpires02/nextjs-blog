import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// é a estrutura do head
export const metadata: Metadata = {
  title: {
    default: "The Blog - Este é um blog com Next.js",
    template: "%s | The Blog",
  },
  description: "Descrição da página",
};

//Esse é o layout principal, caso queira colocar algo que fique em todas as paginas este é o local
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Container>
          <Header />

          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
