import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import React from 'react'

type Props = {
    isFavorite: boolean,
    title: string,
    authorLabel: string,
    createdAt: string,
    onClick: () => void,
    disabled: boolean
}

const Footer = ({isFavorite, title, authorLabel, createdAt, onClick, disabled} : Props) => {
    const handleClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        onClick();
    }
    return (
        <div className='relative bg-white p-3'>
            <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>
            <p className='opacity-0 group-hover:opacity-95 transition-opacity text-[11px] text-muted-foreground truncate'>
                {authorLabel},&nbsp;{createdAt}
            </p>
            <button disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-900",
                    disabled && "cursor-not-allowed opacity-75"
                )}>
                <StarIcon className={cn(
                    "h-4 w-4",
                    isFavorite && 'fill-amber-300 text-amber-800'
                )} />
            </button>
        </div>
    )
}

export default Footer
