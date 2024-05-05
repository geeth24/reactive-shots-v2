import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const blackMud = localFont({
  src: './Blackmud-VGoOx.ttf',
  display: 'swap',
  variable: '--font-blackmud',
});

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
        className={` ${blackMud.variable} ${opensans.className} bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
