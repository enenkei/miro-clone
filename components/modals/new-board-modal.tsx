'use client';
import { Button } from '@/components/ui/button';
import { BoardProps, createBoard } from '@/lib/controller/board';
import Image from 'next/image';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useOrganization, useUser } from '@clerk/nextjs';
import { LoaderIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void
}

const NewBoardModal = ({ open, setOpen }: Props) => {
    const { organization } = useOrganization();
    const { user } = useUser();
    const [title, setTitle] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const onClickCreateBoard = async () => {
        setIsPending(true);
        const boardInfo: BoardProps = {
            authorId: user?.id!,
            authorName: user?.fullName!,
            orgId: organization?.id!,
            title: title
        }
        const board = await createBoard(boardInfo);
        console.log(board);
        if (board) {
            toast({
                title: 'Success',
                description: 'A new board added!'
            })
        }
        setOpen(false);
        setIsPending(false);
        queryClient.refetchQueries({queryKey : ['get-boards', organization?.id!]});
    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>            
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New board</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            id="title"
                            placeholder='Board title'
                            value={title}
                            onChange={(e) => setTitle(e.target?.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending}
                        type="submit" onClick={() => onClickCreateBoard()}>
                        Confirm{isPending && <LoaderIcon className='h-4 w-4 animate-spin transition ml-2' />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewBoardModal
