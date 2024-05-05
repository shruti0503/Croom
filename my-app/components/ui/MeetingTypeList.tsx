'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Description } from '@radix-ui/react-dialog'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from "@/components/ui/input"




function MeetingTypeList() {
    const router=useRouter()
    const [meetingState, setMettingState]=
    useState<'isScheduleMeeting'| 'isInstantMeeting' | 'isJoiningMeeting' | undefined >()
    const {user}=useUser();
    const client=useStreamVideoClient();
    const [values,setValues]=useState({
      dateTime:new Date(),
      Description:"",
      link:""
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
   
console.log("op")

useEffect(()=>{
  console.log("meeting dtate is", meetingState)

}),[meetingState]
const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}}`

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
        handleClick={()=>{ console.log("yha") ;setMettingState('isScheduleMeeting')}}
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
        
            {!callDetails ? (
                <MeetingModal
                  isOpen={meetingState == 'isScheduleMeeting'}
                  onClose={() => setMettingState(undefined)}
                  title="Create Meeting"
                    //@ts-ignore
                  handleClick={createMeeting}
                  
                >
                  <div className="flex flex-col gap-2.5">
                    <label className="text-base font-normal leading-[22.4px] text-sky-2">
                      Add a description
                    </label>
                    <Textarea
                      className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                      onChange={(e) =>
                        setValues({ ...values, Description: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2.5">
                    <label className="text-base font-normal leading-[22.4px] text-sky-2">
                      Select Date and Time
                    </label>
                    <ReactDatePicker
                      selected={values.dateTime}
                      onChange={(date) => setValues({ ...values, dateTime: date! })}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                    />
                  </div>
                
            </MeetingModal>
            ) : (
              <MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMettingState(undefined)}
                title="Meeting Created"
                  //@ts-ignore
                handleClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  toast({ title: 'Link Copied' });
                }}
                image={'/icons/checked.svg'}
                buttonIcon="/icons/copy.svg"
                className="text-center"
                buttonText="Copy Meeting Link"
              />
            )}

        <MeetingModal 
         isOpen={meetingState==='isInstantMeeting'}
         onClose={()=>setMettingState(undefined)}
         title="Start an Instant Meeting"
         buttonText="Start Meeting"
         //@ts-ignore
         handleClick={createMeeting}
        
        />
        <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMettingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>


       
    </section>
  )
}

export default MeetingTypeList