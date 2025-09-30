import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DesignSpec Ltd - Architectural & Design Consulting",
    template: "%s | DesignSpec Ltd",
  },
  description:
    "Consulting with confidence, trust and excellence. Expert architectural design, interior design, urban planning, and project management services since 2010.",
  keywords: [
    "architecture",
    "interior design",
    "urban planning",
    "project management",
    "consulting",
    "Kenya",
  ],
  authors: [{ name: "DesignSpec Ltd" }],
  creator: "DesignSpec Ltd",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "DesignSpec Ltd - Architectural & Design Consulting",
    description: "Consulting with confidence, trust and excellence",
    siteName: "DesignSpec Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignSpec Ltd",
    description: "Consulting with confidence, trust and excellence",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
