import Image from 'next/image';
import React from 'react';

const EmptyFavorite = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <Image src={'/images/bookmark_favorite_support_appreciation_icon_251435.svg'}
                height={140}
                width={140}
                alt='empty' />
            <h2 className='text-2xl font-semibold mt-6'>
                No favorites found
            </h2>
            <p className='text-muted-foreground text-sm mt-2'>
                Try something else
            </p>
        </div>
    )
}

export default EmptyFavorite;
