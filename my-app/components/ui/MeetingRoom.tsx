'use client'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Layout, Users } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import { useSearchParams } from 'next/navigation'


type CallLayout='grid' | 'speaker-left' | 'speaker-right'
function MeetingRoom() {
  const searchParams = useSearchParams();
  const router=useRouter()
  
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setLayout] = useState<CallLayout>('speaker-left');
    const [showParticipants, setshowParticipants] = useState(true)
    const {useCallCallingState}=useCallStateHooks();
    const callingState=useCallCallingState();

    if(callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
          case 'grid':
            return <PaginatedGridLayout />;
          case 'speaker-right':
            return <SpeakerLayout participantsBarPosition="left" />;
          default:
            return <SpeakerLayout participantsBarPosition="right" />;
        }
      };
  return (
    <div className="relative h-screen w-full overflow-hidden pt-4
    text-white 
    ">
        <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
            <CallParticipantsList onClose={()=>setshowParticipants(false)} />
        </div >

        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap' >
             <CallControls  onLeave={()=>{ 
              router.push('/')

             }}
             />

             <DropdownMenu>
                <div className=' flex items-center'>
                  <DropdownMenuTrigger className='cursor-pointer rounded-2xl
                  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                    <Layout size={20} className='text-white'/>
                </DropdownMenuTrigger>
                </div>
                
                <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                    {['Grid', 'Speaker-Left', 'Speaker-right'].map((item,index)=>(
                        <div key={index}>
                            <DropdownMenuItem className='cursor-pointer'
                            onClick={()=>{
                                setLayout(item.toLowerCase() as CallLayout)
                            }}
                            >
                                {item}
                            </DropdownMenuItem>

                        </div>
                    ))}
                    <DropdownMenuSeparator />
                    
                </DropdownMenuContent>
            </DropdownMenu>

            <CallStatsButton />
            <button
            onClick={()=>setshowParticipants((prev)=>prev)}
            >
                <div className='cursor-pointer rounded-2xl border-dark-1bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                    <Users size={20} className='text-white' />

                </div>

            </button>
            {
                !isPersonalRoom && <EndCallButton />
            }




        </div>


        </div>

    </div>
  )
}

export default MeetingRoom