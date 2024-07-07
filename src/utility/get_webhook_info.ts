import axios from "axios";
import {config} from "../config/config";

async function getWebhookInfo() {
    try {
        const url = `https://api.telegram.org/bot${config.telegramBotToken}/getWebhookInfo`
        const webhookInfo = await axios.get(url)
        console.log(webhookInfo.data)
        return webhookInfo.data
    } catch (error) {
        console.error(error)
    }
}

getWebhookInfo()
    .then(() => console.log("Webhook info fetched successfully"))
    .catch((error) => console.error("Failed to fetch webhook info"))