import {Menu} from "@grammyjs/menu";
import handleQuestion from "@/bot/handlers/handleQuestion";
import {logger} from "@/logger";
import {Context} from "grammy";
import {getFirstNameOrTitle} from "@/helpers/chatHelper";

const MENU_NEXT_QUESTION = 'next_question'
export const nextQuestionMenu = new Menu(MENU_NEXT_QUESTION)
    .text('Next question', handleNextQuestion);

// Helper function to handle the next question menu action
async function handleNextQuestion(ctx: Context) {
    try {
        logger.info(`Next question clicked: ${ctx.chat?.id} - ${getFirstNameOrTitle(ctx)}`)
        await ctx.editMessageReplyMarkup({ reply_markup: undefined });
        await handleQuestion(ctx)
    } catch (error) {
        logger.error(error)
    }
}

// Function to clear the message reply markup
function clearReplyMarkup(ctx: any): Promise<any> {
    return ctx.editMessageReplyMarkup({ reply_markup: undefined });
}