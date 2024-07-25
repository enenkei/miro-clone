'use client';
import { Button } from '@/components/ui/button';
import { BoardProps, createBoard } from '@/lib/controller/board';
import Image from 'next/image';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useOrganization, useUser } from '@clerk/nextjs';
import { LoaderIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import NewBoardModal from '@/components/modals/new-board-modal';


const EmptyBoard = () => {
    const { organization } = useOrganization();
    const { user } = useUser();   
    const [open,setOpen] = useState<boolean>(false);    
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <Image src={'/images/ballpoint_pen_stationery_notes_paper_sticky_note_icon_256745.png'}
                height={140}
                width={140}
                alt='empty' />
            <h2 className='text-2xl font-semibold mt-6'>
                Create your first board
            </h2>
            <div className='mt-6'>
                <Button size={'lg'} onClick={() => setOpen(true)}>
                    Create a board
                </Button>
                <NewBoardModal open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default EmptyBoard;
