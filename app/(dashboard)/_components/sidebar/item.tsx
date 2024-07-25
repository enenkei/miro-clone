'use client';
import Hint from '@/components/hint';
import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

type Props = {
    id: string,
    name: string,
    imgUrl: string
}

const Item = ({ id, name, imgUrl }: Props) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();
    const isActive = organization?.id === id;

    const onClick = () => {
        if (!isActive) return;
        //@ts-ignore
        setActive({ organization: id });
    }
    return (
        <div className='aspect-square relative'>
            <Hint label={name} side='right' align='start' sideOffset={18}>
                <Image src={imgUrl}
                    onClick={() => onClick}
                    alt={name}
                    fill
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        isActive && 'opacity-100'
                    )}
                />
            </Hint>
        </div>
    )
}

export default Item
