import React from 'react'
import { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video Calling app by -shruti vishwakarma",
  icons:{
    icon:'/icons/logo.svg'
  }
};

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