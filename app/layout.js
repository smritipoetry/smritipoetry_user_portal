import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "../context/authContext"; // ✅ add this

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SMRITI JHA",
  description: "All Poetries Written By Smriti Jha",
  icons: {
    icon: "preview.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
