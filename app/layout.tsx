import { AuthProvider } from './AuthContext'
import Navbar from './Navbar'

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex h-screen flex-col bg-bgPrimary">
            <Navbar />

            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
