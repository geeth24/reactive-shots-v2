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
  title: 'Reactive Shots | Professional Photography Services',
  description:
    'Professional photography services specializing in portraits and Indian events. Contact Reactive Shots today for your next photo shoot!',
  applicationName: 'Reactive Shots | Professional Photography Services"',
  authors: [{ name: 'Geeth Gunnampalli' }],
  openGraph: {
    images: [
      {
        url: 'https://reactiveshots.com/RS-White.png',
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

      <body className={` ${blackMud.variable} ${opensans.className} bg-background`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
