import type { Metadata } from "next";
import { Lato, Open_Sans } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const blackMud = localFont({
  src: './Blackmud-VGoOx.ttf',
  display: 'swap',
  variable: '--font-blackmud',
});

const stardom = localFont({
  src: './Stardom-Regular.ttf',
  display: 'swap',
  variable: '--font-stardom',
});

// const lato = Lato({
//   subsets: ['latin'],
//   weight: ['100', '300', '400', '700', '900'],
// });
const opensans = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Reactive Shots',
  description: 'Capturing your moments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body
        className={`${stardom.variable} ${blackMud.variable} ${opensans.className} bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
