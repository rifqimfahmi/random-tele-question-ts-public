import {Bot} from "grammy";
import {config} from "@/config/config";
import {ignoreOldMessageUpdates} from "@/middleware/ignoreOldMessageUpdates";
import handleQuestion from "@/bot/commands/handleQuestion";

export const bot = new Bot(config.telegramBotToken)

bot.use(ignoreOldMessageUpdates)

bot.api.setMyCommands([
        {command: "question", description: "Get a random question"}
    ]
)

// bot commands
bot.command('question', handleQuestion)


