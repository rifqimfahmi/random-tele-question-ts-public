import {parseEnv} from "znv";
import * as process from "node:process";
import {z} from "zod";

require('dotenv').config();

function getConfig() {
    const config = parseEnv(process.env, {
        TELEGRAM_BOT_TOKEN: z.string(),
        WEBHOOK_PORT: z.number().default(3000),
        DOMAIN: z.string(),
        MONGO_URL: z.string(),
        OPENAI_TOKEN: z.string(),
        NODE_ENV: z.enum(['dev', 'prod']),
    })

    return {
        ...config,
        isDev: config.NODE_ENV == 'dev',
        isProd: config.NODE_ENV == 'prod'
    }
}

export type Config = ReturnType<typeof getConfig>;

export const config: Config = getConfig();
