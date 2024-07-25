'use client'
import React from 'react';
import EmptySearch from './empty-search';
import EmptyFavorite from './empty-favorite';
import EmptyBoard from './empty-board';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BoardCard from './board-card';
import NewBoardButton from './new-board-button';

type Props = {
    orgId: string,
    query: {
        search?: string,
        favorites?: string
    }
}

const BoardList = ({ orgId, query }: Props) => {
    const {data : boards} = useQuery({
        queryKey : ['get-boards', orgId],
        queryFn : async() => {
            const {data} = await axios.get(`/api/board/get/all?orgId=${orgId}&search=${query.search}`);
            return data.boards;
        },        
    });
    // if(boards === undefined) {
    //     return (
    //         <div className='animate-pulse'>Loading...</div>
    //     )
    // }
    if (!boards?.length && query.search) {
        return (
            <EmptySearch />
        )
    }
    if (!boards?.length && query.favorites) {
        return (
            <EmptyFavorite />
        )
    }
    if(!boards?.length){
        return (
            <EmptyBoard />
        )
    }
    return (
        <div>
            <h2 className='text-3xl'>
                {query.favorites ? "Favorites" : "Team boards"}
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 pb-10 mt-8'>
                <NewBoardButton orgId={orgId} disabled={false} />
                {boards?.map((board : any) => (
                    <BoardCard board={board} key={board.id} isFavorite={board?.userFavorite ? true : false} />
                ))}
            </div>
        </div>
    )
}

export default BoardList;
