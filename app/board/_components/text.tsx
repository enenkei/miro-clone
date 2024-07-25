import { calculateFontSize, cn, colorToCss } from '@/lib/utils';
import { TextLayer } from '@/types/canvas';
import { useMutation } from '@liveblocks/react';
import { Kalam } from 'next/font/google';
import React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
    subsets: ['latin'],
    weight: ['400']
});

type Props = {
    id: string,
    layer: TextLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void,
    selectionColor?: string
}

const Text = ({ id, layer, onPointerDown, selectionColor }: Props) => {
    const { x, y, width, height, value, fill } = layer;

    const updateValue = useMutation((
        {storage},
        newValue : string
    ) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e : ContentEditableEvent) => {
        updateValue(e.target.value);
    }
    return (
        <foreignObject x={x} y={y} width={width} height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : 'none'
            }}>
            <ContentEditable
                html={value || 'Text'}
                onChange={handleContentChange}
                className={cn(
                    'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
                    font.className
                )}
                style={{                    
                    color: fill ? colorToCss(fill) : '#000',
                    fontSize : calculateFontSize(width,height)
                }}
            />
        </foreignObject>
    )
};

export default Text;
