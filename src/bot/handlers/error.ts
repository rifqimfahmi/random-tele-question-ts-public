import type {Context, ErrorHandler} from 'grammy'
import {logger} from "@/logger";

export const errorHandler: ErrorHandler<Context> = (error) => {
    const { ctx } = error

    logger.error({
        err: error.error,
    })
}
