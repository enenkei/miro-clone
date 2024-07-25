import { LoaderIcon } from 'lucide-react';
import React from 'react'
import { InfoSkeleton } from './info';

const Loading = () => {
    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
            <LoaderIcon className='h-6 w-6 text-muted-foreground animate-spin' />
            <InfoSkeleton />
        </main>
    )
}

export default Loading;
