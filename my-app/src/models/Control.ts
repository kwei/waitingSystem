import * as mongoose from "mongoose";
import {MONGO_COLLECTION_CONTROL_TABLE} from "@/utils/resource";
import {Model, Schema} from "mongoose";

export interface IControl extends Document {
    handler: string;
    acceptWaiting: boolean;
    acceptNumber: number;
    handlingName: string[];
    handlingId: number[];
    handlingPhone: string[];
    handlingOrder: number[];
    currentWaiting: number[];
}

const ControlSchema = new Schema({
    handler: { type: String, required: true },
    acceptWaiting: { type: Boolean, required: false },
    acceptNumber: { type: Number, required: false },
    handlingName: { type: [String], required: false },
    handlingId: { type: [Number], required: false },
    handlingPhone: { type: [String], required: false },
    handlingOrder: { type: [Number], required: false },
    currentWaiting: { type: [Number], required: false }

}, {
    collection: MONGO_COLLECTION_CONTROL_TABLE,
    versionKey: false
})

const ControlModel: Model<IControl> = (mongoose.models && mongoose.models.ControlModel) ? mongoose.models.ControlModel : mongoose.model<IControl>('ControlModel', ControlSchema)

export default ControlModel