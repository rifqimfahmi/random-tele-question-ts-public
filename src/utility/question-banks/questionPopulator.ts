import * as fs from "node:fs";
require('module-alias/register')
import {logger} from "@/logger";
import {Question, QuestionModel} from "@/models/Question";
import {sha256Hex} from "@/helpers/crypto";
import startMongo from "@/helpers/startMongo";

async function populateQuestions() {
    await startMongo()
    const assetQuestions: Question[] = getAssetQuestions()
    const remoteQuestionsId = new Set<string>((await QuestionModel.find())
        .map((question: Question) => question._id))
    const notYetUploadedQuestion = assetQuestions.filter(
        question => !remoteQuestionsId.has(question._id)
    )
    await QuestionModel.insertMany(notYetUploadedQuestion)
    logger.info(`done inserting questions: ${notYetUploadedQuestion.length} questions inserted`)
}

function getAssetQuestions(): Question[] {
    const uniqueQuestions = new Set<string>()
    return fs.readFileSync('assets/questions.txt', 'utf-8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => {
            if (line.startsWith('#')) {
                logger.debug(`Ignoring comment line: ${line}`);
                return false;
            }
            if (!line) {
                logger.debug("Ignoring empty line");
                return false;
            }
            if (uniqueQuestions.has(line)) {
                logger.debug(`Duplicate question found: ${line}`);
                return false;
            }
            uniqueQuestions.add(line)
            return true
        }).map(line => ({
            _id: sha256Hex(line),
            text: line
        }))
}

populateQuestions()
    .then(() => {
        // exit script execution
        process.exit(0)
    })
    .catch((error) => {
            logger.error(error)
            process.exit(1)
        }
    )