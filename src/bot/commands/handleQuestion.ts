import {Context} from "grammy";
import {Question, QuestionModel} from "@/models/Question";
import MemCache from "@/helpers/memCache";
import {getRandomElement} from "@/helpers/getRandomElement";
import {QuestionHistory, QuestionHistoryModel} from "@/models/QuestionHistory";
import {nextQuestionMenu} from "@/menu/questionMenu";
import {logger} from "@/logger";
import {getFirstNameOrTitle} from "@/helpers/chatHelper";
import {llm} from "@/helpers/llm";
import {ChatPromptTemplate} from "@langchain/core/prompts";

const ttl = 5 * 60 // 5 minutes
const questionCache = new MemCache<Array<Question>>(ttl)
const key = 'question'

async function getQuestionHistories(ctx: Context) {
    const questionHistory = await QuestionHistoryModel.find({chatId: ctx.chat?.id})
    return new Set(questionHistory.map((q: QuestionHistory) => q.questionId))
}

async function getLLMAnswer(randomQuestion: Question) {
    const template = ChatPromptTemplate.fromTemplate(
        `
        You are a funny AI. you'll be given a question and you have to answer it with a witty reply, and include emoji, be playful.
        at the end rephrase the question back to the users in the group.
        
        question: {question}
        `
    )
    const llmInput = await template.formatMessages({
        question: randomQuestion.text
    })
    const llmAnswer = await llm.invoke(llmInput)
    return llmAnswer.content.toString();
}

export default async function handleQuestion(
    ctx: Context
) {
    const questions = await questionCache.get(key, async () => {
        return QuestionModel.find()
    })
    const questionHistory = await getQuestionHistories(ctx)
    const randomQuestion = getRandomElement(
        questions.filter(q => !questionHistory.has(q._id))
    )
    if (!randomQuestion) {
        logger.info(`No more questions left: ${ctx.chat?.id} - ${ctx.chat?.title}`)
        await QuestionHistoryModel.deleteMany({chatId: ctx.chat?.id})
        if (questions.length !== 0) {
            handleQuestion(ctx) // try again
        }
        return
    }
    await ctx.reply(randomQuestion.text!, {
        reply_markup: nextQuestionMenu
    })
    const llmAnswer = await getLLMAnswer(randomQuestion);
    await ctx.reply(llmAnswer)
    await QuestionHistoryModel.create({
        questionId: randomQuestion._id,
        chatId: ctx.chat?.id,
        chatTitle: getFirstNameOrTitle(ctx)
    })
}