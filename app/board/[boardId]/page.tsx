'use client';
import React from 'react';
import Canvas from '../_components/canvas';
import Room from '@/components/room';
import Loading from '../_components/loading';

type Props = {
  params: {
    boardId: string
  }
}

const BoardPage = ({ params }: Props) => {
  return (
    <div>
      <Room roomId={params.boardId} fallback={<Loading />}>
        <Canvas boardId={params.boardId} />
      </Room>

    </div>
  )
}

export default BoardPage;
