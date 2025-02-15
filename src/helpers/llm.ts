import {ChatOpenAI} from "@langchain/openai";
import {config} from "@/config/config";

export const llm = new ChatOpenAI({
    temperature: 0.5,
    apiKey: config.OPENAI_TOKEN,
    model: "gpt-3.5-turbo",
})