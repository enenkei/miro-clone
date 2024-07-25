import React from 'react';
import getStroke from 'perfect-freehand';
import { getSvgPathfromStroke } from '@/lib/utils';

type Props = {
    x: number,
    y: number,
    points: number[][],
    fill: string,
    onPointerDown?: (e: React.PointerEvent) => void,
    stroke?: string
}

const Path = ({x, y, points, fill, onPointerDown, stroke }: Props) => {    
    return (
        <path className='drop-shadow-md'
            onPointerDown={onPointerDown}
            d={getSvgPathfromStroke(
                getStroke(points, {
                    size : 6,
                    thinning : 0.4,
                    smoothing : 0.9,
                    streamline : 0.9
                })
            )}
            style={{
                transform : `translate(${x}px, ${y}px)`,
            }}
            x={0}
            y={0}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
        />
    )
}

export default Path
