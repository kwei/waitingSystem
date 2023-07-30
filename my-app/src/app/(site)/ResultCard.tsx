"use client"

import {Card} from "@/components/Card";
import {WaitingType} from "@/app/api/waitingInfo/route";
import {waitingStatusStr} from "@/models/Waiting";


export function ResultCard({data: waitingInfo}: {data: WaitingType}) {

    return (
        <Card className='p-8 gap-8 w-3/4'>
            <span className='w-full text-center text-2xl font-bold'>目前候位結果</span>
            <span className='text-base'>候位者名字：{waitingInfo.name}</span>
            <span className='text-base'>候位者學號：{waitingInfo.studentId}</span>
            <span className='text-base'>候位者電話：{waitingInfo.phone}</span>
            <span className='text-base'>候位狀態：{waitingStatusStr[waitingInfo.status]}</span>
            <span className='text-base'>候位號碼：{waitingInfo.order}</span>
            <div className='flex items-center gap-5'>
                <button className='flex-1 py-2 rounded-xl'>取消候位</button>
            </div>
        </Card>
    )
}