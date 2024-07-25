'use client'
import { shallow, useOthersConnectionIds, useOthersMapped } from '@liveblocks/react';
import React, { memo } from 'react';
import { Cursor } from './cursor';
import Path from './path';
import { colorToCss } from '@/lib/utils';

const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
        <>
        {ids?.map((id) => (
            <Cursor key={id} connectionId={id} />
        ))}
        </>
    )
}
const Draft = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft : other.presence.pencilDraft,
        penColor : other.presence.penColor
    }), shallow);
    return (
        <>
        {others.map(([key, other]) => {
            if(other.pencilDraft){
                return (
                    <Path 
                    key={key}
                    x={0}
                    y={0}
                    points={other.pencilDraft}
                    fill={other.penColor ? colorToCss(other.penColor) : "#000"}
                    />
                )
            }
            return null;
        })}        
        </>
    )
}
export const CursorsPresence = memo(() => {
    return (
        <>
        <Draft />
        <Cursors />
        </>
    )
});

CursorsPresence.displayName = "CursorsPresence";

