'use client'
import React from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Description } from '@radix-ui/react-dialog'
import { useToast } from "@/components/ui/use-toast"


function MeetingTypeList() {
    const router=useRouter()
    const [meetingState, setMettingState]=
    useState<'isScheduleMeeting'| 'isInstantMeeting' | 'isJoiningMeeting' | undefined >()
    const {user}=useUser();
    const client=useStreamVideoClient();
    const [values,setValues]=useState({
      dateTime:new Date(),
      Description:"",
      Link:""
    })
   const [callDetails, setcallDetails] = useState<Call>()
   const { toast } = useToast()

    const createMeeting=async()=>{
      if(!client || !user) return;
      try{
        if(!values.dateTime){
          toast({
            title:"Please select a date and time"
          })
          return;
        }
        // crypto is a global proprty-> to generate a random number
        const id=crypto.randomUUID()
        const call=client.call('default',id);
        if(!call) throw new Error('Failed to create call');
        const startsAt= values.dateTime.toISOString() || 
        new Date(Date.now()).toISOString();
        const description=values.Description || 'Instant meeting';

        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{
              description
            }
          }
        })

        setcallDetails(call)
        if(!values.Description){
          router.push(`/meeting/${call.id}`)
        }

        toast({
          title:"Meeting created"
        })

      }
      catch(err){
        console.log(err)
        toast({
          title:"failed to create meeting"
        })

      }

    }
   


  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mt-4 mb-4'>
        <HomeCard 
          img='/icons/add-meeting.svg'
          title="New Meeting"
          description="Start an instant Meeting"
          handleClick={()=>{ setMettingState('isInstantMeeting')}}
          className="bg-orange-1"
        />
        <HomeCard 
        img='/icons/schedule.svg'
        title="Schedule Meeting"
        description="Plane your Meeting"
        handleClick={()=>{ setMettingState('isScheduleMeeting')}}
        className="bg-blue-1"
        />
        <HomeCard
        img='/icons/recordings.svg'
        title="View Meetings"
        description="Checkout your recording"
        handleClick={()=>{router.push('/recordings')}}
        className="bg-purple-1"
         />
        <HomeCard 
        img='/icons/join-meeting.svg'
        title="Join Meeting"
        description="via invitation link "
        handleClick={()=>{ setMettingState('isJoiningMeeting')}}
        className="bg-yellow-1"
        />

        <MeetingModal 
         isOpen={meetingState==='isInstantMeeting'}
         onClose={()=>setMettingState(undefined)}
         title="Start an Instant Meeting"
         buttonText="Start Meeting"
         //@ts-ignore
         handleClick={createMeeting}
        
        />

       
    </section>
  )
}

export default MeetingTypeList