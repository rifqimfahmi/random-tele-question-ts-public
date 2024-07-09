type Config = {
    telegramBotToken: string;
    webhookPort: number;
    domain: string;
    mongoUri: string;
    openAIToken: string;
};

require('dotenv').config();

function getConfig(): Config {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const webhookPort = parseInt(process.env.WEBHOOK_PORT || '3000', 10)
    const domain = process.env.DOMAIN || process.env.RAILWAY_PUBLIC_DOMAIN
    const mongoUri = process.env.MONGO_URL
    const openAIToken = process.env.OPENAI_TOKEN

    if (!telegramBotToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not defined in your environment variables');
    }

    if (!webhookPort) {
        throw new Error('WEBHOOK_PORT is not defined in your environment variables');
    }

    if (!domain) {
        throw new Error('DOMAIN is not defined in your environment variables');
    }

    if (!mongoUri) {
        throw new Error('MONGO_URL is not defined in your environment variables');
    }

    if (!openAIToken) {
        throw new Error('OPENAI_TOKEN is not defined in your environment variables');
    }

    return {
        telegramBotToken,
        webhookPort,
        domain,
        mongoUri,
        openAIToken
    };
}

export const config: Config = getConfig();
