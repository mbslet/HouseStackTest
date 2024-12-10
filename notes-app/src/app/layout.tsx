import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "House Stack App",
  description: "House Stack Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
