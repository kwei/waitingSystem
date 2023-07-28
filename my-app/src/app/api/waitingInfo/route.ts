import {NextRequest} from "next/server";
import {mongoCRUD} from "@/utils/mongoCRUD";
import WaitingModel, {IWaiting, waitingStatus} from "@/models/Waiting";

export interface WaitingType {
    _id?: string;
    name: string;
    studentId: string;
    phone: string;
    order: number;
    requiredTime: number;
    finishedTime: number;
    status: waitingStatus;
}

export interface MajorWaitingInfo {
    name: string;
    studentId: string;
    phone: string;
}

export async function POST(req: NextRequest, ) {
    return mongoCRUD<IWaiting>(req, WaitingModel)
}