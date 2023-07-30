"use client"

import {createContext} from "react";
import {WaitingType} from "@/app/api/waitingInfo/route";

const defaultSetFunction = (arg: WaitingType | null) => {}
export const WaitingContext = createContext<[WaitingType | null, (arg: WaitingType | null) => void]>([
    null, defaultSetFunction
])