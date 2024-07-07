import {Bot} from "grammy";
import {config} from "../config/config";

export const bot = new Bot(config.telegramBotToken)

bot.command(
    'start',
        ctx => ctx.reply('Hello! I am a bot!')
)


