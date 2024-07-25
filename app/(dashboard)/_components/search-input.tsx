'use client';
import React, { ChangeEvent, useEffect } from 'react';
import qs from 'query-string';
import { useDebounceValue } from 'usehooks-ts';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';

const SearchInput = () => {
    const router = useRouter();
    // const [value, setValue] = useState("");
    // const {organization} = useOrganization();
    const [debounceValue, setValue] = useDebounceValue("", 500);
    // const queryClient = useQueryClient();
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    // console.log(organization?.id);
    useEffect(() => {
        const url = qs.stringifyUrl({
            url : '/',
            query : {
                search : debounceValue
            },       
        }, {skipEmptyString : true, skipNull : true});
        router.push(url);
        // queryClient.refetchQueries({ queryKey: ['get-boards', organization?.id!] });
    },[debounceValue, router]);

    return (
        <div className='w-full relative'>
            <SearchIcon className='h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground' />
            <Input className='w-full max-w-[516px] pl-9'
                onChange={handleChange}
                placeholder='Search boards...' />
        </div>
    )
}

export default SearchInput;
