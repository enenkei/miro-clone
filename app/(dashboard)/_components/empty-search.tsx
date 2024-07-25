import Image from 'next/image';
import React from 'react';

const EmptySearch = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <Image src={'/images/global_search_international_seo_icon_192469.svg'}
                height={140}
                width={140}
                alt='empty' />
            <h2 className='text-2xl font-semibold mt-6'>
                No results found
            </h2>
            <p className='text-muted-foreground text-sm mt-2'>
                Try something else
            </p>
        </div>
    )
}

export default EmptySearch;
