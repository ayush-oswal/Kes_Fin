import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kesariya Finance",
  description: "Quick Gold Loans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full flex justify-center bg-slate-900">
        <Provider>
        <div className="bg-slate-500 h-full w-full flex flex-col justify-between">
        <Nav />
        <Toaster position="top-center" />
        {children}
        <Footer />
        </div>
        </Provider>
      </body>
    </html>
  );
}
