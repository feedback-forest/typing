import Providers from "@/features/provider/Provider";
import "./globals.css";
import localFont from "next/font/local";
import { ToastToaster, Toaster } from "@/shared/ui";
import TypingHeader from "@/shared/ui/Header/TypingHeader/TypingHeader";

const pretendard = localFont({
  src: "/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "타자모어",
  description: "한결같이 굳건하게",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function TypingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <head></head>
      <body className={`${pretendard.className} flex flex-col w-full h-full `}>
        <main className="flex w-full h-full flex-1">
          <div className="flex flex-col w-full h-full justify-center items-center relative">
            <div className="flex flex-col w-full h-full justify-center items-start relative max-w-[375px] mx-auto">
              <TypingHeader />
              <div className="flex flex-col w-full h-full justify-start items-start">
                <div className="flex items-center justify-center w-full h-full bg-white">
                  <div
                    className={`${pretendard.className} flex flex-col w-full pt-5 max-w-[375px] relative`}
                  >
                    <Providers>
                      <main>{children}</main>
                      <Toaster />
                      <ToastToaster />
                    </Providers>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
