import axios from "axios";
require('module-alias/register')
import {config} from "@/config/config";
import {logger} from "@/logger";

async function getMe() {
    try {
        const url = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/getMe`
        const me = await axios.get(url)
        logger.info(me.data)
        return me.data
    } catch (error) {
        logger.error(error)
    }
}

getMe()
    .then(() => console.log("getMe info fetched successfully"))
    .catch((error) => console.error("Failed to fetch getMe info"))