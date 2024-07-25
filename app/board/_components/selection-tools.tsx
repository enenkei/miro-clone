'use client';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';
import { Camera, Color } from '@/types/canvas';
import { useMutation, useSelf } from '@liveblocks/react';
import React from 'react';
import ColorPicker from './color-picker';
import { useDeleteLayers } from '@/hooks/use-delete-layers';
import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { BringToFrontIcon, SendToBackIcon, Trash2Icon } from 'lucide-react';

type Props = {
    camera: Camera,
    setLastUsedColor: (color: Color) => void
}

const SelectionTools = ({ camera, setLastUsedColor }: Props) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation((
        {storage}
    ) => {
        const liveLayerIds = storage.get("layerIds");
        const indices : number[] = [];
        const arr = liveLayerIds.toImmutable();
        for(let i = 0; i < arr.length; i++){
            if(selection?.includes(arr[i])){
                indices.push(i);
            }
        }

        for(let i = 0; i < indices.length; i++){
            liveLayerIds.move(indices[i], i);
        }
    }, [selection]);

    const bringToFront = useMutation((
        {storage}
    ) => {
        const liveLayerIds = storage.get("layerIds");
        const indices : number[] = [];
        const arr = liveLayerIds.toImmutable();
        for(let i = 0; i < arr.length; i++){
            if(selection?.includes(arr[i])){
                indices.push(i);
            }
        }

        for(let i = indices.length-1; i >= 0; i--){
            liveLayerIds.move(indices[i], arr.length-1-(indices.length-1-i));
        }
    }, [selection]);


    const setFill = useMutation(({ storage }, fill: Color) => {
        const liveLayers = storage?.get("layers");
        setLastUsedColor(fill);
        selection?.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        });
    }, [selection!, setLastUsedColor!]);

    const deleteLayers = useDeleteLayers();
    
    // const selectionBounds = useSelectionBounds();
    // if (!selectionBounds) {
    //     return;
    // }
    // const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    // const y = selectionBounds.y + camera.y;
    
    return (
        <div className='absolute p-3 rounded-xl bg-white shadow-sm border flex flex-col select-none right-14 top-12'
            style={{transform: `translate(calc(${50}px),calc(${50}px))`}}
            >
            <ColorPicker onChange={setFill} />
            <div className='flex flex-row gap-y-0.5'>
                <Hint label='Bring to front'>
                    <Button variant={'board'} size={'icon'} onClick={bringToFront}>
                        <BringToFrontIcon className='h-6 w-6' />
                    </Button>
                </Hint>
                <Hint label='Send to back'>
                    <Button variant={'board'} size={'icon'} onClick={moveToBack}>
                        <SendToBackIcon className='h-6 w-6' />
                    </Button>
                </Hint>
            </div>
            <div className='flex items-center border-neutral-200'>
                <Hint label='Delete'>
                    <Button variant={'board'} size={'icon'} onClick={deleteLayers!}>
                        <Trash2Icon className='h-6 w-6' />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}

export default SelectionTools;
