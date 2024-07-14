import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider'
import { Navbar } from '@/components/navbar/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { UIProviders } from '@/components/UIProviders'
import Footer from '@/components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang='en'>
        <body className={roboto.className}>
          <UIProviders>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              {/* <Footer /> */}
            </ThemeProvider>
          </UIProviders>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
