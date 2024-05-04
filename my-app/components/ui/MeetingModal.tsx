import React, {ReactNode} from 'react'
import Image from 'next/image';
import { Button } from './button';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  

interface MeetingModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title:string;
    className?: string;
    Children?:ReactNode;
    handleClick?:()=>string;
    buttonText?:String;
    image?:string;
    buttonIcon:string;

}

function MeetingModal({isOpen, onClose, title,className, Children, handleClick, buttonText,
    image, buttonIcon
}:MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6
    py-9 text-white'>
        <div className='flex flex-col gap-6'>
            {image && (
                <div className='flex justify-end'>
                    <Image src={image} alt="img " width={72} height={72} />
                </div>
               
            )}
             <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                {Children}
             <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
             onClick={handleClick}
             
             >
                {buttonIcon && (
                    <Image src={buttonIcon} alt='button icon' width={13} height={13} />
                )}&nbsp;
               {buttonText || 'Schedule Meeting'}
             </Button>
             
        </div>
        
    </DialogContent>
    </Dialog>

  )
}

export default MeetingModal