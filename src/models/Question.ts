import {getModelForClass, modelOptions, plugin, prop} from "@typegoose/typegoose";
import {FindOrCreate} from "@/helpers/mongoFindOrCreate";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Question extends FindOrCreate{
    @prop()
    _id!: mongoose.Types.ObjectId
    @prop()
    text?: string
}

export const QuestionModel = getModelForClass(Question)
