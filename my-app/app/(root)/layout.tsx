import React from 'react'
import { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'

function RootLayout({children}:{children:ReactNode}) {
  return (
    <main> 

      <StreamVideoProvider>
       {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout