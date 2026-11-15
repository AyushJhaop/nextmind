import "./globals.css";

export const metadata = {
  title: "NEXTMIND | AI Education — Build Skills. Create Possibilities.",
  description:
    "Don't just learn about AI. Learn to build with it. Practical AI, automation and digital technology programmes for college students, graduates and young professionals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..700&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FFF7EB] text-[#153D30] antialiased selection:bg-[#C9D9B9] selection:text-[#082F24]">
        <a
          href="#main-content"
          className="visually-hidden focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:rounded-full focus:bg-[#0B382A] focus:text-[#FFF7EB] focus:font-bold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

