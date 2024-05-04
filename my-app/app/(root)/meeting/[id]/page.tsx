'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall } from '@stream-io/video-react-sdk';
import { StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetUp from '@/components/ui/MeetingSetUp';
import MeetingRoom from '@/components/ui/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/ui/Loader';


// dyynamic routes ,  [id] folder name -> id here 
function Meeting({params:{id}}:{params:{id:string}}) {
  const {user, isLoaded}=useUser();
  const [isSetupComplete, setIsSetupComplete]=useState(false)
  const {call, isCallLoading}=useGetCallById(id);
  

  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full
    '>
     <StreamCall call={call}>
      <StreamTheme>
        {
          !isSetupComplete ? (
            <MeetingSetUp 
            />
          ):(
            <MeetingRoom />
          )
        }

      </StreamTheme>
     </StreamCall>
    </main>
  )
}

export default Meeting