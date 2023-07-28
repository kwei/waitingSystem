import {ReactNode} from "react";
import {Card} from "@/components/Card";
import { IoClose } from "react-icons/io5";

interface PropsType {
    children?: ReactNode;
    className?: string;
    onClose?: () => void;
}

export function Modal(props: PropsType) {
    const { children, className = '', onClose } = props

    const handleOnCloseModal = () => {
        if (onClose) onClose()
    }

    return (
        <div className='modal fixed z-10 top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
            <div className='grid w-full grid-cols-12 z-20'>
                <div className='col-span-1 md:col-span-2'></div>
                <Card className={`relative col-span-10 md:col-span-8 bg-white shadow-card ${className}`}>
                    <IoClose className='absolute w-6 h-6 top-4 right-4 hover:cursor-pointer hover:scale-110' onClick={handleOnCloseModal} />
                    {children}
                </Card>
                <div className='col-span-1 md:col-span-2'></div>
            </div>
        </div>
    )
}