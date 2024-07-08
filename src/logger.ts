import { pino } from 'pino'

export const logger = pino({
    // level: config.LOG_LEVEL,
    transport: {
        targets:
            // ...(config.isDev ?
                [
                    {
                        target: 'pino-pretty',
                        options: {
                            ignore: 'pid,hostname',
                            colorize: true,
                            translateTime: false,
                        },
                    },
                ]
            //     : [
            //         {
            //             target: 'pino/file',
            //             level: config.LOG_LEVEL,
            //             options: {},
            //         },
            //     ]),
        ,
    },
})

export type Logger = typeof logger
