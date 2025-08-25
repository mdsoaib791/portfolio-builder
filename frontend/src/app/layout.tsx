import { TooltipProvider } from "@/components/ui/tooltip"
import AuthProvider from "@/contexts/auth-provider"
import TanstackProvider from "@/providers/TanstackProvider"
import { ThemeProvider } from "@/providers/theme-provider"
import { ContextProviders } from "@/redux/provider"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

// ✅ Proper font variable name
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add font weights as needed
  display: "swap",
})

export const metadata: Metadata = {
  title: "Md Soaib - Portfolio",
  description:
    "Frontend Developer specializing in React, Next.js, and React Native. Passionate about crafting scalable and user-friendly digital experiences.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <TanstackProvider>
          <ContextProviders>
            <TooltipProvider>
              <AuthProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {children}
                </ThemeProvider>
              </AuthProvider>
            </TooltipProvider>
          </ContextProviders>
        </TanstackProvider>
      </body>
    </html>
  )
}
