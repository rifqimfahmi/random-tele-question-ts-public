import {Context} from "grammy";

export default async function (ctx: Context) {
  if (ctx.from && ctx.from.language_code) {
      ctx.reply('Hey I am your question bank bot', {
          parse_mode: 'Markdown',
      })
  }
}