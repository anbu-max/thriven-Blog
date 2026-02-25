import { Outfit, Montserrat, Lato } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "THRIVEN",
  description: "Minimalist perspective on the infinite digital landscape.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${montserrat.variable} ${lato.variable} antialiased bg-white text-black selection:bg-black selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
