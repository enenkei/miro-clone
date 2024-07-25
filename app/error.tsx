'use client';

import Image from 'next/image';
import React from 'react';

const Error = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src={'/images/warning-error-svgrepo-com.png'} width='300' height='300' alt='Error' />
    </div>
  )
}

export default Error;
