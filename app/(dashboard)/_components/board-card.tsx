'use client';
import { Board, UserFavorite } from '@prisma/client';
import Image from 'next/image';
// import Link from 'next/link';
import React, { useState } from 'react';
import Overlay from './overlay';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/nextjs';
import Footer from './footer';
import Actions from '@/components/actions';
import { MoreHorizontalIcon } from 'lucide-react';
import { addFavorite, removeFavorite } from '@/lib/controller/board';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
    board: Board & {
        userFavorite : UserFavorite
    },
    isFavorite?: boolean
}

const BoardCard = ({ board, isFavorite }: Props) => {
    const { userId } = useAuth();
    const authorLabel = userId === board.authorId ? "You" : board.authorName;
    const [isPending, setIsPending] = useState<boolean>(false);

    const createdAtLabel = formatDistanceToNow(board.createdAt, {
        addSuffix: true
    });
    const router = useRouter();
    // console.log(board);
    const queryClient = useQueryClient();

    const toggleFavorite = () => {
        if (!isFavorite) {
            setIsPending(true);
            addFavorite(board?.id, board?.orgId!, userId!);
        } else {
            setIsPending(true);
            removeFavorite(board?.id, board?.orgId!, userId!);
        }
        setIsPending(false);
        queryClient.refetchQueries({ queryKey: ['get-boards', board?.orgId!] });
    }
    return (
        <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
            <div className='relative flex-1 bg-amber-50' role='button' onClick={() => router.push(`/board/${board.id}`)}>
                <Image src={board.imageUrl}
                    alt={board.title}
                    fill
                    className='object-contain'
                    />
                <Overlay />
                <Actions id={board.id}
                    title={board.title}
                    side='right'>
                    <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
                        <MoreHorizontalIcon className='text-amber-100 opacity-75 hover:opacity-100 transition-opacity' />
                    </button>
                </Actions>
            </div>
            <Footer
                isFavorite={isFavorite!}
                title={board.title}
                authorLabel={authorLabel}
                createdAt={createdAtLabel}
                onClick={() => toggleFavorite()}
                disabled={isPending}
            />
        </div>
    )
}

export default BoardCard;
