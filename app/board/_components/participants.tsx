'use client';
import { useOthers, useSelf } from '@liveblocks/react';
import React from 'react';
import UserAvatar from './user-avatar';
import { connectionIdColor } from '@/lib/utils';

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 2;
  // console.log(users);
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {users?.slice(0, 2).map(({ connectionId, info }) => {
          return (
            <UserAvatar key={connectionId}
              borderColor={connectionIdColor(connectionId)}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || 'T'} />
          )
        })}
        {currentUser && (
          <UserAvatar src={currentUser?.info?.picture}
            borderColor={connectionIdColor(currentUser?.connectionId)}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]} />
        )}
        {hasMoreUsers && (
          <UserAvatar name={`${users.length - 2} more`}            
            fallback={`+${users.length-2}`} />
        )}
      </div>
    </div>
  )
}

export default Participants
