import {Context} from "grammy";
import {Question, QuestionModel} from "@/models/Question";
import MemCache from "@/helpers/memCache";
import {getRandomElement} from "@/helpers/getRandomElement";

const ttl = 5 * 60 // 5 minutes
const questionCache = new MemCache<Array<Question>>(ttl)
const key = 'question'

export default async function (
    ctx: Context
)   {
    // const question = await QuestionModel.find()
    const questions = await questionCache.get(key, async () => {
        return QuestionModel.find()
    })
    const randomQuestion = getRandomElement(questions)
    await ctx.reply(randomQuestion.text!)
}