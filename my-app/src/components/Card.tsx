import {ReactNode} from "react";

interface PropsType {
    children?: ReactNode;
    className?: string;
}

export function Card(props: PropsType) {
    const { children, className = '' } = props
    return (
        <div className={`flex flex-col border border-gray-300 rounded-2xl p-4 ${className}`}>
            {children}
        </div>
    )
}