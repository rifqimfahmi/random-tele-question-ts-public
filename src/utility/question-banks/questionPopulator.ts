import * as fs from "node:fs";

async function populateQuestions() {
    const questions = fs.readFileSync('questions.txt', 'utf-8');
}