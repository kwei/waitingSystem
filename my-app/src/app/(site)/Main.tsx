"use client"

import {useRef, useState} from "react";
import {MajorWaitingInfo, WaitingType} from "@/app/api/waitingInfo/route";
import {queryWaiting} from "@/app/api/waitingInfo/queryWaiting";
import {ResultCard} from "@/app/(site)/ResultCard";
import {RegisterCard} from "@/app/(site)/RegisterCard";

export function Main() {
    const [waitingInfo, setWaitingInfo] = useState<WaitingType | null>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)
    const [nameWording, setNameWording] = useState<string | null>(null)
    const [phoneWording, setPhoneWording] = useState<string | null>(null)
    const [idWording, setIdWording] = useState<string | null>(null)
    const [queryResultWording, setQueryResultWording] = useState<string | null>(null)

    const queryWaitingInfo = async (query: MajorWaitingInfo) => {
        return queryWaiting(query).then(res => {
            if (res) return res[0]
            return null
        }).catch(e => {
            console.log(e)
            return null
        })
    }

    const handleOnQuery = async () => {
        if (nameRef.current && phoneRef.current && idRef.current) {
            const name = nameRef.current.value
            const phone = phoneRef.current.value
            const id = idRef.current.value

            if (name === '') setNameWording('Name is needed.')
            if (phone === '') setPhoneWording('Phone is needed.')
            if (id === '') setIdWording('Student ID is needed.')

            if (name !== '' && phone !== '' && id !== '') {
                const res = await queryWaitingInfo({
                    name: name,
                    phone: phone,
                    studentId: id
                })
                if (res) setWaitingInfo(res)
                else setQueryResultWording('目前沒有您的候位記錄')
            }
        }
    }


    return (
        <div className='flex w-full flex-col items-center gap-4'>
            {waitingInfo
                ? <ResultCard />
                : <RegisterCard />
            }
            {waitingInfo &&
                <div className='flex items-center gap-5'>
                    <button className='flex-1 py-2 rounded-xl'>取消候位</button>
                </div>
            }
            {!waitingInfo &&
                <div className='flex items-center gap-5'>
                    <button className='flex-1 py-2 rounded-xl'>查詢</button>
                    <button className='flex-1 py-2 rounded-xl'>候位</button>
                </div>
            }
        </div>
    )
}
