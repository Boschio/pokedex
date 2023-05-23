"use client";

import Script from 'next/script'
import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

import { AuthContextProvider, useAuthContext } from "./context/auth"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PokeDex',
  description: 'PokeDex by Boschio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { user, setUser }: any = useAuthContext();

  return (
    <AuthContextProvider>
      <html lang="en" className='min-h-screen'>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Script id='test'>
            {`document.querySelector('.hamburger').addEventListener('click', () => {
              document.querySelector('.nav-links').classList.toggle('hidden');
              document.querySelector('.nav-list').classList.toggle('flex-col');
              document.querySelector('.navbar').classList.toggle('flex-col');
              document.querySelector('.nav-list').classList.toggle('text-2xl');
              document.querySelector('.join-button').classList.toggle('w-[184px]');
            });`}
          </Script>
        </body>
      </html>
    </AuthContextProvider>
  )
}
