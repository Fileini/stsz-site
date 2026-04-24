import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://storysizer.org"),
  title: {
    default: "StorySizer",
    template: "%s | StorySizer",
  },
  description:
    "StorySizer helps teams estimate user stories with structured, collaborative, and objective story point workflows.",
  applicationName: "StorySizer",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "StorySizer",
    type: "website",
    url: "https://storysizer.org",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "StorySizer",
                url: "https://storysizer.org",
                logo: "https://storysizer.org/icon.png",
                sameAs: ["https://app.storysizer.org"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "StorySizer",
                url: "https://storysizer.org",
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "StorySizer",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                url: "https://app.storysizer.org",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
            ]),
          }}
        />
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
