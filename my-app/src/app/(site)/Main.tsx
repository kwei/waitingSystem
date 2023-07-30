"use client"

import {ResultCard} from "@/app/(site)/ResultCard";
import {RegisterCard} from "@/app/(site)/RegisterCard";
import {useContext, useEffect, useMemo, useState} from "react";
import {WaitingContext} from "@/context";
import {queryControl} from "@/app/api/control/queryControl";
import {ControlType} from "@/app/api/control/route";

export function Main() {
    const [waitingInfo,] = useContext(WaitingContext)
    const [controlIno, setControlInfo] = useState<ControlType | null>(null)

    useEffect(() => {
        queryControl({}).then(res => {
            if (res) return res[0]
            return null
        }).then(res => {
            console.log(res)
            if (res) setControlInfo(res)
        })
    }, [waitingInfo])

    const currentWaitingStatus = useMemo(() => {
        if (controlIno) {
            return controlIno.acceptWaiting ? '可以候位' : '無法候位'
        } return '確認中...'
    }, [controlIno])

    const currentWaitingNumber = useMemo(() => {
        if (controlIno) {
            return controlIno.currentWaiting.join(' & ')
        } return '無'
    }, [controlIno])

    return (
        <div className='flex w-full flex-col items-center gap-4'>
            <div className='flex flex-col w-3/4'>
                <span>候位系統狀態：{currentWaitingStatus}</span>
                <span>當前候位順位：{currentWaitingNumber}</span>
            </div>
            {waitingInfo
                ? <ResultCard data={waitingInfo} />
                : <RegisterCard />
            }
        </div>
    )
}
