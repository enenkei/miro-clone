'use client';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link2Icon, PencilIcon, Trash2Icon } from 'lucide-react';
import { toast } from './ui/use-toast';
import { useOrganization, useUser } from '@clerk/nextjs';
import { deleteBoard } from '@/lib/controller/board';
import { RESPONSE_MESSAGES } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmModal from './modals/confirm-modal';
import { Button } from './ui/button';
import { useRenameModal } from '@/store/use-rename-modal';
import UpdateBoardModal from './modals/update-board-modal';


type Props = {
    children: React.ReactNode,
    side?: DropdownMenuContentProps["side"],
    sideOffset?: DropdownMenuContentProps["sideOffset"],
    id: string,
    title: string
}

const Actions = ({ children, side, sideOffset, id, title }: Props) => {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const { organization } = useOrganization();
    const [open, onClose] = useState<boolean>(false);

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast({ description: 'Link copied' }))
            .catch(() => toast({ description: 'Error!' }));
    }
    const onDeleteItem = async () => {
        const resp = await deleteBoard(id, user?.id!);
        if (resp === RESPONSE_MESSAGES.DELETED) {
            toast({ description: 'Board deleted' });
        } else {
            toast({ description: 'Error!' });
        }
        queryClient.refetchQueries({ queryKey: ['get-boards', organization?.id!] });
    }
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className='w-44'>
                <DropdownMenuItem className='p-3 cursor-pointer' onClick={onCopyLink}>
                    <Link2Icon className='h-4 w-4 mr-2' />Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className='p-3 cursor-pointer' onClick={() => {onClose(!open)}}>
                    <PencilIcon className='h-4 w-4 mr-2' />Rename                    
                </DropdownMenuItem>                
                <ConfirmModal header='Delete board?' 
                    description='This will delete the board and its content permanently'
                    onConfirm={onDeleteItem} disabled={false}>
                    <Button className='p-3 cursor-pointer text-sm w-full justify-start font-normal' variant={'ghost'}>
                        <Trash2Icon className='h-4 w-4 mr-2' />Delete
                    </Button>
                </ConfirmModal>                
            </DropdownMenuContent>            
        </DropdownMenu>
        <UpdateBoardModal onClose={onClose} isOpen={open} id={id} title={title} />        
        </>
    )
};

export default Actions;
