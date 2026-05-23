import "./globals.css";
import { fontSans, fontSerif } from "@/utils/fonts";
import StoreProvider from "@/store/StoreProvider";
import InitialSessionLoader from "@/store/InitialSessionLoader";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Firmly",
  description: "Legal practice management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col flex-1 w-full">
        <StoreProvider>
          <InitialSessionLoader>
            {children}
           <Toaster
                richColors
                position="top-right"
                toastOptions={{
                  style: { zIndex: 9999 },
                }}
              />
          </InitialSessionLoader>
        </StoreProvider>
      </body>
    </html>
  );
}