'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type Props = {
    isOpen: boolean,
    onClose: (open: boolean) => void,
    title: string,
    id: string
}

const UpdateBoardModal = ({ isOpen, onClose, title, id }: Props) => {
    const [_, setTitle] = useState<string>(title);
    return (
        <Dialog open={isOpen} onOpenChange={() => onClose(!isOpen)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                    <DialogDescription>
                        Change the board title
                    </DialogDescription>
                </DialogHeader>
                <Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    maxLength={60}
                    placeholder='Board title...' />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant={'outline'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateBoardModal;
