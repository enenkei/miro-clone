import { calculateFontSize, cn, colorToCss, getContrastingTextColor } from '@/lib/utils'
import { NoteLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react'
import { Kalam } from 'next/font/google'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

type Props = {
    id: string,
    layer: NoteLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void,
    selectionColor?: string
}

const font = Kalam({
    subsets: ['latin'],
    weight: ['400']
});


const StickyNote = ({ id, layer, onPointerDown, selectionColor }: Props) => {
    const { x, y, width, height, value, fill } = layer;

    const updateValue = useMutation((
        { storage },
        newValue: string
    ) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }
    return (
        <foreignObject x={x} y={y} width={width} height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
                backgroundColor: fill ? colorToCss(fill) : '#000'
            }}
            className='shadow-md drop-shadow-xl'>
            <ContentEditable
                html={value || 'Text'}
                onChange={handleContentChange}
                className={cn(
                    'h-full w-full flex items-center justify-center text-center outline-none',
                    font.className
                )}
                style={{
                    color: fill ? getContrastingTextColor(fill) : '#000',
                    fontSize: calculateFontSize(width,height)
                }}
            />
        </foreignObject>
    )
}

export default StickyNote
