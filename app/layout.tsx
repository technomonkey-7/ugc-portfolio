import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await client.fetch(`*[_type == "profile"][0]{
    name,
    headline,
    bio,
    heroImage,
    favicon
  }`);

  const title = profile?.name ? `${profile.name} | UGC Portfolio` : "Engineering & Creativity | UGC Portfolio";
  const description = profile?.headline || "Computer Engineering Student & UGC Creator based in Turin. Specializing in high-converting visual stories.";
  const ogImage = profile?.heroImage ? urlForImage(profile.heroImage).width(1200).height(630).url() : null;
  // Favicon: 64x64, fit='max' to prevent cropping, quality=80 for speed.
  const icon = profile?.favicon ? urlForImage(profile.favicon).width(64).height(64).fit('max').auto('format').quality(80).url() : "/favicon.ico";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
      type: 'website',
    },
    icons: {
      icon: icon,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.className} antialiased selection:bg-white selection:text-black overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
