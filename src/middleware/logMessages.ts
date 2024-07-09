import {Context, NextFunction} from "grammy";
import {logger} from "@/logger";
import {getFirstNameOrTitle} from "@/helpers/chatHelper";

export const logMessages = async (ctx: Context, next: NextFunction) => {
    logger.info(`Incoming message from ${getFirstNameOrTitle(ctx)}: ${ctx.message?.text}`)
    return next()
}