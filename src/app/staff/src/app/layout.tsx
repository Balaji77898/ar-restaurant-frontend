import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { OrdersProvider } from '@/contexts/OrdersContext'
import { NavigationProvider } from '@/contexts/NavigationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurant Staff Web',
  description: 'Staff Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <OrdersProvider>
            <NavigationProvider>
              {children}
            </NavigationProvider>
          </OrdersProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
