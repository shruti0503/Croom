'use client'
import { SignIn } from '@clerk/nextjs'
import { useEffect } from 'react'

function SignInPage() {
  useEffect(()=>{
    console.log("signin page")

  },[])
  console.log("signin page")
  return (
    <div className='flex h-screen w-full items-center justify-center'><SignIn /></div>
  )

}

export default SignInPage