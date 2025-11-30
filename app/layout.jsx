import './globals.css';

export const metadata = {
  title: 'IMAGICITY',
  description: 'A bold creative agency experience built with Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">{children}</body>
    </html>
  );
}
