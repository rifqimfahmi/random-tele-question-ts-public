import {Bot} from "grammy";
import {config} from "@/config/config";
import {ignoreOldMessageUpdates} from "@/middleware/ignoreOldMessageUpdates";

export const bot = new Bot(config.telegramBotToken)

bot.use(ignoreOldMessageUpdates)



// bot commands
bot.command(
    'question',
        ctx => ctx.reply('Hello! I am a bot!')
)


