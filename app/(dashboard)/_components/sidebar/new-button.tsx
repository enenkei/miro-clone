'use client';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from 'lucide-react';
import { CreateOrganization } from '@clerk/nextjs';
import Hint from '@/components/hint';


const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='aspect-square'>
                    <Hint label="Create Organization" side='right' align='start' sideOffset={18}>
                        <button
                            className='bg-white/25 h-full w-full 
                        rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition'>
                            <PlusIcon className='w-4 h-4' />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    )
}

export default NewButton;
