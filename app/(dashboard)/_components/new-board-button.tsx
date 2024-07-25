'use client';
import NewBoardModal from '@/components/modals/new-board-modal';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  orgId: string,
  disabled?: boolean
}

const NewBoardButton = ({ orgId, disabled }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button disabled={disabled}
        onClick={() => {setOpen(true)}}
        className={cn(
          "col-span-1 aspect-[100/127] bg-blue-500 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-between py-6",
          disabled && "opacity-60"
        )}>
        <div />
        <PlusIcon className='h-12 w-12 text-white stroke-1' />
        <p className='text-sm text-white font-light'>
          New board
        </p>
      </button>
      <NewBoardModal open={open} setOpen={setOpen} />
    </>
  )
}

export default NewBoardButton;
