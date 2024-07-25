'use client';
import Actions from '@/components/actions';
import Hint from '@/components/hint';
import UpdateBoardModal from '@/components/modals/update-board-modal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MenuIcon } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
  boardId: string
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

const Info = ({ boardId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: board } = useQuery({
    queryKey: ['get-board', boardId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/board/get?boardId=${boardId}`);
      return data.board;
    }
  });
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label='Go to Boards' side='bottom' sideOffset={10}>
        <Button asChild className='px-2 py-1' variant={'board'}>
          <Link href={"/"}>
            <Image src={"/images/18-BMzOPW9S0fDSdKz-cutout.png"}
              alt='board-logo'
              height={40}
              width={40} />
            <span className={cn(
              "font-semibold text-xl ml-2 text-black",
              font.className
            )}>
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Button variant={'board'} onClick={() => setOpen(true)}
        className='text-base font-normal px-2'>
        {board?.title}
      </Button>
      <TabSeparator />
      <Actions id={board?.id}
        title={board?.title}
        side='bottom'
        sideOffset={10}>
        <div>
          <Hint label='Menu' side='bottom' sideOffset={10}>
            <Button size={'icon'} variant={'board'}>
              <MenuIcon />
            </Button>
          </Hint>
        </div>
      </Actions>
      <UpdateBoardModal isOpen={open} onClose={setOpen} title={board?.title} id={board?.id} />
    </div>
  )
}

export const InfoSkeleton = function InfoSkeleton() {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'>
      <Skeleton className='h-full w-full bg-muted-foreground' />
    </div>
  )
}

const TabSeparator = () => {
  return (
    <div className='text-neutral-300 px-1.5 font-bold'>|</div>
  )
}

export default Info;
