'use client';
import { useOrganizationList } from '@clerk/nextjs';
import React from 'react'
import Item from './item';

const List = () => {
    const {userMemberships} = useOrganizationList({
        userMemberships : {
            infinite : true
        }
    });
    if(!userMemberships.data?.length) return null;
    return (
        <ul className='space-y-4'>
            {userMemberships.data?.map((member) => (
                <p key={member.organization.id}>
                    <Item key={member.organization.id}
                        id={member.organization.id} 
                        imgUrl={member.organization.imageUrl}
                        name={member.organization.name} />
                </p>
            ))}
        </ul>
    )
}

export default List
