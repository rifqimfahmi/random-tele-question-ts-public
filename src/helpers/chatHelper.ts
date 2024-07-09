import {Context} from "grammy";

export function getFirstNameOrTitle(ctx: Context) {
    return ctx.chat?.title || ctx.chat?.first_name || "unknown";
}