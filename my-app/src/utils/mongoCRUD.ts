import {NextRequest, NextResponse} from "next/server";
import mongoose, {Model} from "mongoose";
import {MONGO_DB_NAME} from "@/utils/resource";

export enum QueryType {
    create,
    read,
    findAll,
    update,
    delete
}

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const MONGO_CLUSTER = process.env.MONGO_CLUSTER ?? ''
const MONGO_REGION = process.env.MONGO_REGION ?? ''

export async function mongoCRUD<T>(req: NextRequest, model: Model<T>) {
    const body = await req.json()
    const type = body["type"] as QueryType
    const query = body["query"]
    const data = body["data"]

    console.log("Query Type: ", type)
    console.log("Query Object: ", query)
    console.log("Data Object: ", data)

    try {
        await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.${MONGO_REGION}.mongodb.net/${MONGO_DB_NAME}`)

        switch (type) {
            case QueryType.create:
                await model.create(data)
                return NextResponse.json({ success: true, message: 'success', data: [data] })
            case QueryType.read:
                const res = await model.findOne(query)
                console.log("res: ", res)
                return NextResponse.json({ success: true, message: 'success', data: res ? [res] : [] })
            case QueryType.findAll:
                const resList = await model.find(query)
                console.log("resList: ", resList)
                return NextResponse.json({ success: true, message: 'success', data: resList ?? [] })
            case QueryType.update:
                const dataToBeUpdated = await model.findOne(query)
                console.log("dataToBeUpdated: ", dataToBeUpdated)
                if (dataToBeUpdated) await dataToBeUpdated.updateOne(data)
                else return NextResponse.json({ success: false, message: 'no exited document', data: [] })
                return NextResponse.json({ success: true, message: 'success', data: [data] })
            case QueryType.delete:
                await model.deleteOne(query)
                return NextResponse.json({ success: true, message: 'success', data: [query] })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false, message: e, data: [] })
    }
}