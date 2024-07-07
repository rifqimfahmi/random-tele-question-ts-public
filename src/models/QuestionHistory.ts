import {getModelForClass, modelOptions, plugin, prop} from "@typegoose/typegoose";
import {FindOrCreate} from "@/helpers/mongoFindOrCreate";
import mongoose from "mongoose";

@modelOptions({})
export class QuestionHistory extends FindOrCreate{
    @prop()
    questionId!: string
    @prop()
    chatId?: string
    @prop()
    chatTitle?: string
}

export const QuestionHistoryModel = getModelForClass(QuestionHistory)
