import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
// CSS
import "./globals.css";
import "react-dropzone-uploader/dist/styles.css";

import { ModalProvider } from "@/providers/ModalProvider";
import { Toaster } from "sonner";

// Font
const inter = Inter({ subsets: ["latin"] });
// Metadata
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster richColors toastOptions={{ duration: 3000 }} />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
