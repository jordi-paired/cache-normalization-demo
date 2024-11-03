import React from "react";

import Providers from "../Providers";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex justify-center bg-slate-100 min-h-[100vh]">
            <div className="w-[800px]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
