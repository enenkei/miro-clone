'use client';
import { colorToCss } from '@/lib/utils';
import { Color } from '@/types/canvas';
import React from 'react';

type Props = {
    onChange: (color: Color) => void
}

interface ColorButtonProps {
    onClick: (color: Color) => void,
    color: Color
}

const ColorButton = ({
    onClick, color
}: ColorButtonProps) => {
    return (
        <button className='w-8 h-8 items-center flex justify-center hover:opacity-75 transition' 
            onClick={() => onClick(color)}>
            <div className='h-8 w-8 rounded-md border border-neutral-300'
                style={{background : colorToCss(color)}} />
        </button>
    )
}

const ColorPicker = ({ onChange }: Props) => {
    return (
        <div className='grid grid-cols-2 gap-2 items-center max-w-[164px] mr-2 border-neutral-200'>
            <ColorButton onClick={onChange} color={{r:255,g:255,b:255}}/>
            <ColorButton onClick={onChange} color={{r:0,g:0,b:0}}/>
            <ColorButton onClick={onChange} color={{r:243,g:82,b:35}}/>
            <ColorButton onClick={onChange} color={{r:255,g:248,b:219}}/>
            <ColorButton onClick={onChange} color={{r:255,g:199,b:237}}/>
            <ColorButton onClick={onChange} color={{r:125,g:138,b:188}}/>
            <ColorButton onClick={onChange} color={{r:48,g:68,b:99}}/>
            <ColorButton onClick={onChange} color={{r:255,g:166,b:47}}/>
            <ColorButton onClick={onChange} color={{r:255,g:201,b:111}}/>
            <ColorButton onClick={onChange} color={{r:255,g:232,b:200}}/>
            <ColorButton onClick={onChange} color={{r:172,g:215,b:147}}/>
            <ColorButton onClick={onChange} color={{r:255,g:127,b:62}}/>
            <ColorButton onClick={onChange} color={{r:128,g:196,b:233}}/>
            <ColorButton onClick={onChange} color={{r:96,g:76,b:195}}/>
            <ColorButton onClick={onChange} color={{r:151,g:49,b:49}}/>
            <ColorButton onClick={onChange} color={{r:196,g:12,b:12}}/>
            <ColorButton onClick={onChange} color={{r:54,g:186,b:152}}/>
            <ColorButton onClick={onChange} color={{r:238,g:237,b:235}}/>
            <ColorButton onClick={onChange} color={{r:114,g:151,b:98}}/>
            <ColorButton onClick={onChange} color={{r:3,g:174,b:210}}/>
            <ColorButton onClick={onChange} color={{r:177,g:175,b:255}}/>
            <ColorButton onClick={onChange} color={{r:80,g:60,b:60}}/>
        </div>
    )
}

export default ColorPicker;
