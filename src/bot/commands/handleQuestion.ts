import {Context, InlineKeyboard} from "grammy";
import {Question, QuestionModel} from "@/models/Question";
import MemCache from "@/helpers/memCache";
import {getRandomElement} from "@/helpers/getRandomElement";
import {QuestionHistory, QuestionHistoryModel} from "@/models/QuestionHistory";

const ttl = 5 * 60 // 5 minutes
const questionCache = new MemCache<Array<Question>>(ttl)
const key = 'question'
const DATA_NEXT_QUESTION = 'next_question'

async function getQuestionHistories(ctx: Context) {
    const questionHistory = await QuestionHistoryModel.find({chatId: ctx.chat?.id})
    return new Set(questionHistory.map((q: QuestionHistory) => q.questionId))
}

export default async function handleQuestion (
    ctx: Context
)   {
    const questions = await questionCache.get(key, async () => {
        return QuestionModel.find()
    })
    const questionHistory = await getQuestionHistories(ctx)
    const randomQuestion = getRandomElement(questions
        .filter(q => !questionHistory.has(q._id))
    )
    if (!randomQuestion) {
        console.log(`No more questions left: ${ctx.chat?.id} - ${ctx.chat?.title}`)
        await QuestionHistoryModel.deleteMany({chatId: ctx.chat?.id})
        if (questions.length !== 0) {
            handleQuestion(ctx) // try again
        }
        return
    }
    const nextQuestionMarkup = new InlineKeyboard()
        .text('Next question', DATA_NEXT_QUESTION)
    await ctx.reply(randomQuestion.text!, {
        reply_markup: nextQuestionMarkup
    })
    await QuestionHistoryModel.create({
        questionId: randomQuestion._id,
        chatId: ctx.chat?.id,
        chatTitle: ctx.chat?.title || ctx.chat?.first_name
    })
}