import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'),
  title: {
    default: 'FlimFlix - Movies & Reviews',
    template: '%s | FlimFlix'
  },
  description: 'Discover and download movies, read reviews, and stay updated with the latest releases on FlimFlix.',
  keywords: ['movies', 'movie reviews', 'film downloads', 'movie streaming', 'film reviews', 'movie information'],
  authors: [{ name: 'FlimFlix Team' }],
  creator: 'FlimFlix',
  publisher: 'FlimFlix',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'FlimFlix',
    title: 'FlimFlix - Movies & Reviews',
    description: 'Discover and download movies, read reviews, and stay updated with the latest releases on FlimFlix.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FlimFlix - Movies & Reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlimFlix - Movies & Reviews',
    description: 'Discover and download movies, read reviews, and stay updated with the latest releases on FlimFlix.',
    images: ['/og-image.jpg'],
    creator: '@flixflix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Fr2Qlgbnonn6z9NxP0yAqyvn2RNmrLRdgzRcAm6aqLs',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
