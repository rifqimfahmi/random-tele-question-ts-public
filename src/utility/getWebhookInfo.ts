import axios from "axios";
require('module-alias/register')
import {config} from "@/config/config";
import {logger} from "@/logger";

async function getWebhookInfo() {
    try {
        const url = `https://api.telegram.org/bot${config.telegramBotToken}/getWebhookInfo`
        const webhookInfo = await axios.get(url)
        logger.info(webhookInfo.data)
        return webhookInfo.data
    } catch (error) {
        logger.error(error)
    }
}

getWebhookInfo()
    .then(() => console.log("Webhook info fetched successfully"))
    .catch((error) => console.error("Failed to fetch webhook info"))