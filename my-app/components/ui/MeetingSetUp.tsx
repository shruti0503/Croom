'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './button';

function MeetingSetUp({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) {

    const [isMicCamToggledOn, setIsMicCamTogglesOn]=useState(false);
    const call=useCall()
    const [isMicCamToggled, setIsMicCamToggled] = useState(false);

    if(!call){
        throw new Error('useCall must be used within StreamCall component')
    }

    useEffect(() => {
        console.log("call ", call)
      if (isMicCamToggled) {

        call?.camera.disable();
        call?.microphone.disable();
      } else {
        call?.camera.enable();
        call?.microphone.enable();
      }
    }, [isMicCamToggled, call?.camera, call?.microphone]);




  return (
    <div className='flex h-screen w-full flex-col 
    items-center justify-center gap-3 font-bold text-white'>
        <h1 className='text-2xl font-bold'>
            SetUp
        </h1>
        <VideoPreview/>
        <div className='flex h-16 items-center'>
            <label className='flex items-center gap-2 font-medium'>
                <input 
                type='checkbox'
                checked={isMicCamToggledOn}
                onChange={(e)=>setIsMicCamToggled(e.target.checked)}
                />
                Join with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={()=>{
            call.join();
            setIsSetupComplete(true)
        }}>
            Join Meeting

        </Button>

    </div>
  )
}

export default MeetingSetUp