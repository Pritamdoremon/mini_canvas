import "./globals.css";

export const metadata = {
  title: "Mini Design Canvas",
  description: "A small React Konva canvas editor"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
