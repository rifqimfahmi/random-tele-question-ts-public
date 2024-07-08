import {Menu} from "@grammyjs/menu";
import handleQuestion from "@/bot/commands/handleQuestion";
import {logger} from "@/logger";
import {Context} from "grammy";

const MENU_NEXT_QUESTION = 'next_question'
export const nextQuestionMenu = new Menu(MENU_NEXT_QUESTION)
    .text('Next question', handleNextQuestion);

// Helper function to handle the next question menu action
async function handleNextQuestion(ctx: Context) {
    try {
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