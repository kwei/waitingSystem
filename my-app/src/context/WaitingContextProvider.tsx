"use client"

import {ReactNode, useState} from "react";
import {WaitingType} from "@/app/api/waitingInfo/route";
import { WaitingContext } from ".";

interface PropsType {
    children?: ReactNode;
    data: WaitingType | null;
}

export function WaitingContextProvider(props: PropsType) {
    const [data, setData] = useState<WaitingType | null>(props.data)

    return (
        <WaitingContext.Provider value={[ data, setData ]}>
            {props.children}
        </WaitingContext.Provider>
    )
}