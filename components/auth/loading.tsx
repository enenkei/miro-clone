import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <Image src={'/images/loading-svgrepo-com.svg'} alt='loading'
                width={120}
                height={120}
                className='duration-1000 transition animate-pulse' />
        </div>
    )
}

export default Loading
