'use client'
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
  import { ReactNode, useEffect } from 'react';
  import { useState } from 'react';
  import { tokenProvider } from '@/actions/stream.actions';
  import Loader from '@/components/ui/Loader';
  
  // next public means -> exposed to the lcient side of the application 
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;



   const StreamVideoProvider = ({children}:{ children: ReactNode }) => {

    const [videoClient, setVideoClient]=useState<StreamVideoClient>()
    const {user, isLoaded}=useUser();

    useEffect(()=>{
        if(!isLoaded || !user) return;
        if(!apiKey) throw new Error('Stream API key missing')

        const client=new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl,
            },
            tokenProvider:tokenProvider
        })
        setVideoClient(client)

     },[user, isLoaded]);

    // if(!videoClient) return <Loader />
   
    

    return(
        <StreamVideo 
        //@ts-ignore
        client={videoClient}
        >
            {children}
        </StreamVideo>

    )
     
  };

  export default StreamVideoProvider