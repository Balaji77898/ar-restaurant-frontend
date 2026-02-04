import './globals.css'

export const metadata = {
  title: 'Premium Restaurant - Fine Dining Experience',
  description: 'Experience dining excellence with our premium restaurant ordering app',
  keywords: ['restaurant', 'fine dining', 'premium', 'food ordering', 'luxury dining'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
