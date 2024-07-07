import {getModelForClass, modelOptions, plugin, prop} from "@typegoose/typegoose";
import {FindOrCreate} from "@/helpers/mongoFindOrCreate";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { collection: 'questions' } })
export class Question extends FindOrCreate {
    @prop()
    _id!: string
    @prop()
    text?: string
}

export const QuestionModel = getModelForClass(Question)
