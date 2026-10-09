import { site } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: site.name,
  description: site.description,
  icons: site.icons,
  openGraph: {
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
