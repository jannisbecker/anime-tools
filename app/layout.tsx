import { AuthProvider } from './AuthContext'
import Navbar from './Sidebar'

import './globals.css'
import Sidebar from './Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-slate-50">
            <Sidebar />

            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
