import express from "express";
import {webhookCallback} from "grammy";
import { v4 as uuidv4 } from 'uuid';
require('module-alias/register')
import {config} from "@/config/config";
import {bot} from "@/bot/bot";
import startMongo from "@/helpers/startMongo";
import {logger} from "@/logger";


async function runApp() {
    const app = express();
    const secretWebhookPath = uuidv4();

    await startMongo()

    app.use(express.json());
    app.use(`/${secretWebhookPath}`, webhookCallback(bot, "express"));
    app.listen(config.WEBHOOK_PORT, async () => {
        await bot.api.setWebhook(`${config.DOMAIN}/${secretWebhookPath}`);
        logger.info(`Bot webhook is up and running`);
    });
}

runApp()