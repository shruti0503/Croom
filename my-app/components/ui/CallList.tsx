//@ts-nocheck
'use client'
import React, { useState } from 'react'
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useEffect } from 'react';
import { useToast } from './use-toast';
const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const {endedCalls, upcomingCalls, callRecordings, isloading}=useGetCalls();
    const router=useRouter();
    const toast=useToast
    const [recordings, setRecordings]=useState<CallRecording[]>([])

    const getCalls=()=>{
        switch (type){
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
             
        }
    }
    const getNoCallsMessage=()=>{
        switch (type){
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
             
        }
    }
    const calls=getCalls();
    const noCallsMessage=getNoCallsMessage();

    useEffect(()=>{



        try{
            const fetchRecordings=async()=>{
                const callData=await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()))
                const recordings=callData.filter(call=>call.recordings.length>0).flatMap(call=>call.recordings)
                setRecordings(recordings)
            }
            if(type=='recordings') fetchRecordings()

        }
        catch(err){
            console.log(err)
            toast({title:'Try again later'})
        }

        

    },[])

    if(isloading) return <Loader />
    
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
          {calls && callRecordings.length > 0 ? (
            calls.map((meeting: Call | CallRecording) => (
              <MeetingCard 
              key={(meeting as Call).id}
              icon={
                type==='ended' ? 'icons/previous.svg' : type ==='upcoming'? '/icons/upcoming.svg':'/icons/recordings.svg'
              }
              title={(meeting as Call).state?.custom?.description?.substring(0,20)|| meeting?.filename.substring(0,20)|| 'No description'}
              date={meeting.state?.startsAt.toLocaleString() || start_time.toLocaleString()}
              isPreviousMeeting={type==='ended'}
              buttonIcon1={type==='recordings'}
              handleClick={type==='recordings'?()=> router.push(`/meeting/${meeting.id}`): ()=>router.push(`/meeting/${meeting.id}`)}
              link={type==='recordings'?'meeting.url':`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
              buttonText={type==='recordings'?'Play':'Start'}
              />
            ))
          ) : (
            <h1>{noCallsMessage}</h1>
          )}
        </div>
    );
      
}

export default CallList