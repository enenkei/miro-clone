'use client';
import React, { ReactNode } from 'react';
import { ClientSideSuspense } from '@liveblocks/react';
import { RoomProvider } from '@/liveblocks.config';
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { Layer } from '@/types/canvas';

type Props = {
    children: React.ReactNode,
    roomId: string,
    fallback: NonNullable<ReactNode> | null
}

const Room = ({ children, roomId, fallback }: Props) => {
    return (
        // <LiveblocksProvider publicApiKey='pk_dev_8REJvNjUdahhoSxortMhwa1OW6nWtNpDmrF_hzZjldGzyowxeTPN7SKB0Yafvc0v'>
            <RoomProvider id={roomId} 
                initialPresence={{cursor : {x : 0, y : 0}, selection : [], pencilDraft : null, penColor : null}}
                initialStorage={{
                    layers : new LiveMap<string, LiveObject<Layer>>(),
                    layerIds : new LiveList([]),
                }}>
                <ClientSideSuspense fallback={fallback}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        // </LiveblocksProvider>

    )
};

export default Room;
