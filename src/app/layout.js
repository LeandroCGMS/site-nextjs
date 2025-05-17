import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Seu Site ou App, Nossa Meta",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description: `Este site foi desenvolvido em uma das muitas tecnologias, com a qual nossa empresa trabalha. O Next.js é uma das mais utilizadas atualmente, e com certeza, você já deve ter visto algum site que utiliza essa tecnologia.
  Você contará com um servidor e site protegido contra ataques de força bruta, negação de serviço (DDOS), SQL Injection, entre outras ameaças. Também contará com certificado SSL de criptografia grátis ou pago dependendo do seu objetivo. Desenvolvemos sites, com responsividade, visando, em primeiro lugar, os celulares (mobile first). Você terá a sua disposição nossas habilidades em SEO, Cloud Computing, WebSockets, Gateway de Pagamentos, conceito SPA, APIs, SOAs, arquitetura REST, proxy reverso – com NGINX – containerização – com docker – e clusters – com Kubernetes. No frontend, CSS Flexible Box Layout, Grid Layout, além de frameworks CSS. A escolha de todas as ferramentas ou parte delas depende do seu objetivo e condições.
  Visamos, sempre, as melhores práticas, como código limpo e as melhores ferramentas (clean code / best practices), as mais eficientes e eficazes, prezando pelo o que há de mais atual em desenvolvimento de software. Um exemplo é usar ferramentas de plataformas colaborativas que atualizam o código em seu servidor, a cada implementação, ao invés de acesso FTP ou mesmo SSH manualmente.

  Me peça um orçamento sem compromisso.
  `,
  keywords: "Next.js, React, Desenvolvimento Web, Frontend, Backend, Fullstack, Leandro Santos de Carvalho, mobile, web, development, desenvolvimento web, desenvolvimento frontend, desenvolvimento backend, desenvolvimento fullstack",
  authors: [
    {
      name: "Leandro Santos de Carvalho",
      url: "https://leandrocgms.online",
    },
  ],
  creator: "Leandro Santos de Carvalho",
  publisher: "Leandro Santos de Carvalho",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8541534777119535"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body

      >
        {children}
      </body>
    </html>
  );
}
