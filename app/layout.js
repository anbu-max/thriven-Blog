import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "THRIVEN",
  description: "Minimalist perspective on the infinite digital landscape.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased font-outfit bg-white text-black selection:bg-black selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
