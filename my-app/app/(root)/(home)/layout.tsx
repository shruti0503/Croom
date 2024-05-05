import React from 'react'
import { ReactNode } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import { sidebarLinks } from '@/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video Calling app by -shruti vishwakarma",
  icons:{
    icon:'/icons/logo.svg'
  }
};

function RootLayout({children}:{children:ReactNode}) {
  return (
    <main className='relative'>
       <Navbar />
        <div className='flex'>
           <Sidebar />
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28
            max-md:pb-14 sm:px-14'>
                <div className='w-full'>
                    {children}

                </div>

            </section>
        </div>
    
    </main>
  )
}

export default RootLayout