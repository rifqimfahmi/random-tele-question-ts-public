import {Context} from "grammy";

export function getFirstNameOrTitle(ctx: Context) {
    return ctx.chat?.title || ctx.chat?.first_name || "unknown";
}

/**
 * Escapes special characters in a string with a preceding backslash.
 *
 * @param input - The input string to be escaped.
 * @returns The escaped string.
 */
export function escapeTelegramSpecialCharacters(input: string): string {
    const specialCharacters = /[!\-|{}=.]/g;
    return input.replace(specialCharacters, '\\$&');
}