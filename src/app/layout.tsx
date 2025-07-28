import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';

const blackMud = localFont({
  src: './Blackmud-VGoOx.ttf',
  display: 'swap',
  variable: '--font-blackmud',
});

const opensans = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Reactive Shots | Professional Photography & Videography Services',
  description:
    'Professional photography & videography services specializing in portraits and Indian events. Contact Reactive Shots today!',
  applicationName: 'Reactive Shots | Professional Photography & Videography Services"',
  authors: [{ name: 'Geeth Gunnampalli' }],
  openGraph: {
    images: [
      {
        url: 'https://reactiveshots.com/RS-Logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />

      <body className={`${blackMud.variable} ${opensans.className} bg-background-dark`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
