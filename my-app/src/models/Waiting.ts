import * as mongoose from "mongoose";
import {MONGO_COLLECTION_WAITING_TABLE} from "@/utils/resource";
import {Model, Schema} from "mongoose";

export interface IWaiting extends Document {
    name: string;
    studentId: string;
    phone: string;
    requiredTime: number;
    finishedTime: number;
    status: waitingStatus;
}

export enum waitingStatus {
    waiting,
    completed,
    canceled,
    going
}

export const waitingStatusStr: Record<string, string> = {
    [waitingStatus.completed]: '完成',
    [waitingStatus.waiting]: '等待中',
    [waitingStatus.canceled]: '取消',
    [waitingStatus.going]: '進行中'
}

const WaitingSchema = new Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    phone: { type: String, required: true },
    requiredTime: { type: Number, required: true },
    finishedTime: { type: Number, required: true },
    status: { type: Number, required: true }

}, {
    collection: MONGO_COLLECTION_WAITING_TABLE,
    versionKey: false
})

const WaitingModel: Model<IWaiting> = (mongoose.models && mongoose.models.WaitingModel) ? mongoose.models.WaitingModel : mongoose.model<IWaiting>('WaitingModel', WaitingSchema)

export default WaitingModel