import {Context, NextFunction} from "grammy";
import {logger} from "@/logger";

/**
 * Middleware to ignore old message updates based on a predefined threshold.
 *
 * This function checks the age of incoming messages against a threshold (currently set to 5 minutes).
 * If the message is older than the threshold, it logs the message details and does not proceed to the next middleware.
 * Otherwise, it calls the next middleware in the chain.
 *
 * @param {Context} ctx - The context of the incoming update, containing the message and other data.
 * @param {NextFunction} next - The next middleware function in the processing chain.
 */
const threshold = 5 * 60 // 5 minutes
export function ignoreOldMessageUpdates(
    ctx: Context,
    next: NextFunction
) {
    if (ctx.message) {
        const timeDiff = new Date().getTime() / 1000 - ctx.message.date;
        if (timeDiff < threshold) {
            return next();
        } else {
            logger.info(
                `Ignoring message from ${ctx.from?.id} at ${ctx.chat?.id} (${
                    Math.trunc(new Date().getTime() / 1000)
                }:${ctx.message.date})`
            );
        }
    }
}