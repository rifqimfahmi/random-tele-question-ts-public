import {Bot} from "grammy";
import {config} from "@/config/config";
import {ignoreOldMessageUpdates} from "@/middleware/ignoreOldMessageUpdates";
import handleQuestion from "@/bot/handlers/handleQuestion";
import {nextQuestionMenu} from "@/menu/questionMenu";
import {logMessages} from "@/middleware/logMessages";
import {errorHandler} from "@/bot/handlers/error";

export const bot = new Bot(config.TELEGRAM_BOT_TOKEN)
bot.errorBoundary(errorHandler)

bot.use(nextQuestionMenu)
bot.use(ignoreOldMessageUpdates)
bot.use(logMessages)

bot.api.setMyCommands([
        {command: "question", description: "Get a random question"}
    ]
)

// bot commands
bot.command('question', handleQuestion)


