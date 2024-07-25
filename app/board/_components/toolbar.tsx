import React from 'react';
import ToolButton from './tool-button';
import { CircleIcon, MousePointer2, PencilIcon, Redo2Icon, SquareIcon, StickyNoteIcon, TypeIcon, Undo2Icon } from 'lucide-react';
import { CanvasMode, CanvasState, LayerType } from '@/types/canvas';

type Props = {
  canvasState : CanvasState,
  setCanvasState : (newState : CanvasState) => void,
  undo : () => void,
  redo : () => void,
  canUndo : boolean,
  canRedo : boolean
}

const Toolbar = ({canvasState, undo, redo, canRedo, canUndo, setCanvasState} : Props) => {
  return (
    <div className='absolute top-80 -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <ToolButton label='Select' icon={MousePointer2} onClick={() => setCanvasState({mode : CanvasMode.None})} 
          isActive={canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          } />
        <ToolButton label='Text' icon={TypeIcon} onClick={() => setCanvasState({mode : CanvasMode.Inserting, layerType : LayerType.Text})} 
          isActive={canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          } />
        <ToolButton label='Sticky Note' icon={StickyNoteIcon} 
          onClick={() => setCanvasState({mode : CanvasMode.Inserting, layerType : LayerType.Note})} 
          isActive={canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note} />
        <ToolButton label='Rectangle' icon={SquareIcon} 
          onClick={() => setCanvasState({mode : CanvasMode.Inserting, layerType : LayerType.Rectangle})} 
          isActive={canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle} />
        <ToolButton label='Ellipsis' icon={CircleIcon} 
          onClick={() => setCanvasState({mode : CanvasMode.Inserting, layerType : LayerType.Ellipse})} 
          isActive={canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse} />
        <ToolButton label='Pen' icon={PencilIcon} 
          onClick={() => setCanvasState({mode : CanvasMode.Pencil})} 
          isActive={canvasState.mode === CanvasMode.Pencil} />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton label='Undo' icon={Undo2Icon} onClick={undo} isDisabled={canUndo} />
        <ToolButton label='Redo' icon={Redo2Icon} onClick={redo} isDisabled={!canRedo} />
      </div>
    </div>
  )
}

export default Toolbar;
