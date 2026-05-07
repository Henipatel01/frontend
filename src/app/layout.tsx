
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import TokenLoader from "@/component/tokenLoader";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <TokenLoader />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}