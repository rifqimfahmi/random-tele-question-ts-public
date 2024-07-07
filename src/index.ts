import express from "express";
import {webhookCallback} from "grammy";
import {config} from "./config/config";
import {bot} from "./bot/bot";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const secretWebhookPath = uuidv4();
app.use(express.json());
app.use(`/${secretWebhookPath}`, webhookCallback(bot, "express"));
app.listen(config.webhookPort, async () => {
    await bot.api.setWebhook(`${config.domain}/${secretWebhookPath}`);
    console.log(`Bot webhook is up and running`);
});
