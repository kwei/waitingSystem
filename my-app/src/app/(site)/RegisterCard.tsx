"use client"

import {Card} from "@/components/Card";
import {useContext, useRef, useState} from "react";
import {MajorWaitingInfo} from "@/app/api/waitingInfo/route";
import {queryWaiting} from "@/app/api/waitingInfo/queryWaiting";
import {WaitingContext} from "@/context";
import {setWaiting} from "@/app/api/waitingInfo/setWaiting";
import {waitingStatus} from "@/models/Waiting";
import {Loading} from "@/components/Loading";


export function RegisterCard() {
    const [, setWaitingInfo] = useContext(WaitingContext)
    const nameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)
    const [isQuerying, setIsQuerying] = useState<boolean>(false)
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
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

    const validateInfo = async () => {
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
                if (res) {
                    setWaitingInfo(res)
                    return { status: true, existed: true, data: res }
                }
                return { status: true, existed: false, data: {
                        name: name,
                        phone: phone,
                        studentId: id
                    } }
            }
        }
        return { status: false, existed: false, data: null }
    }

    const handleOnQuery = async () => {
        setIsQuerying(true)
        validateInfo().then(res => {
            if (res.data && !res.existed) setQueryResultWording('目前沒有您的候位記錄')
        }).finally(() => {
            setIsQuerying(false)
        })
    }

    const handleOnRegister = async () => {
        setIsRegistering(true)
        const validateRes = await validateInfo()
        const AllWaiting = await queryWaiting({ })
        let currentOrder = 0
        if (AllWaiting) currentOrder = AllWaiting.length
        if (validateRes.status && !validateRes.existed && validateRes.data) {
            setWaiting({
                finishedTime: 0,
                name: validateRes.data.name,
                order: currentOrder,
                phone: validateRes.data.phone,
                requiredTime: new Date().getTime(),
                status: waitingStatus.waiting,
                studentId: validateRes.data.studentId
            }).then(res => {
                if (res) setQueryResultWording('註冊成功')
                else setQueryResultWording('註冊失敗')
            }).finally(() => {
                setIsRegistering(false)
                queryWaitingInfo(validateRes.data).then(res => {
                    if (res) setWaitingInfo(res)
                })
            })
        }
    }

    const rmNameWording = () => {
        setNameWording(null)
        setQueryResultWording(null)
    }

    const rmIdWording = () => {
        setIdWording(null)
        setQueryResultWording(null)
    }

    const rmPhoneWording = () => {
        setPhoneWording(null)
        setQueryResultWording(null)
    }

    return (
        <Card className='p-8 gap-8 w-3/4'>
            <span className='w-full text-center text-2xl font-bold'>線上候位查詢 / 登記</span>
            <div className='flex flex-col gap-5'>
                <label className='flex flex-col'>
                    <span className='text-base font-semibold'>名字</span>
                    <input
                        className='rounded-xl border border-solid border-gray-300 p-3'
                        type='text'
                        name='name'
                        ref={nameRef}
                        placeholder='ex: KW'
                        autoComplete='name'
                        onChange={rmNameWording}
                    />
                    <span className='text-sm text-red-500'>{nameWording}</span>
                </label>
                <label className='flex flex-col'>
                    <span className='text-base font-semibold'>學號</span>
                    <input
                        className='rounded-xl border border-solid border-gray-300 p-3'
                        type='text'
                        name='id'
                        ref={idRef}
                        placeholder='ex: 109523065'
                        autoComplete='on'
                        onChange={rmIdWording}
                    />
                    <span className='text-sm text-red-500'>{idWording}</span>
                </label>
                <label className='flex flex-col'>
                    <span className='text-base font-semibold'>電話</span>
                    <input
                        className='rounded-xl border border-solid border-gray-300 p-3'
                        type='text'
                        name='phone'
                        ref={phoneRef}
                        placeholder='ex: 09xxxxxxxx'
                        autoComplete='on'
                        onChange={rmPhoneWording}
                    />
                    <span className='text-sm text-red-500'>{phoneWording}</span>
                </label>
            </div>
            <span className='text-base text-red-500'>{queryResultWording}</span>
            <div className='flex items-center gap-5'>
                <button className='flex-1 py-2 rounded-xl' onClick={handleOnQuery} disabled={isQuerying}>
                    {isQuerying
                        ? <Loading className='m-auto' />
                        : '查詢'
                    }
                </button>
                <button className='flex-1 py-2 rounded-xl' onClick={handleOnRegister} disabled={isRegistering}>
                    {isRegistering
                        ? <Loading className='m-auto' />
                        : '登記'
                    }
                </button>
            </div>
        </Card>
    )
}