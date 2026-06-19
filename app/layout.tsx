import type { Metadata } from "next";
import { Header } from "@/components/UI/Header/Header";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "semprogroup",
  description: "Демо проект жилого комплекса",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <SmoothScrollProvider header={<Header />}>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
