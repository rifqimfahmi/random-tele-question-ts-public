type Config = {
    telegramBotToken: string;
    webhookPort: number;
    domain: string;
};

require('dotenv').config();

function getConfig(): Config {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const webhookPort = parseInt(process.env.WEBHOOK_PORT || '3000', 10)
    const domain = process.env.DOMAIN || process.env.RAILWAY_PUBLIC_DOMAIN

    if (!telegramBotToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not defined in your environment variables');
    }

    if (!webhookPort) {
        throw new Error('WEBHOOK_PORT is not defined in your environment variables');
    }

    if (!domain) {
        throw new Error('DOMAIN is not defined in your environment variables');
    }

    return {
        telegramBotToken,
        webhookPort,
        domain
    };
}

export const config: Config = getConfig();
