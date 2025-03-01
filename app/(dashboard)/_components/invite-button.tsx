import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { OrganizationProfile } from '@clerk/nextjs';

const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <PlusIcon className='h-4 w-4 mr-2' />
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className='p-0 bg-transparent border-none max-w-[880px]'>
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}

export default InviteButton;
