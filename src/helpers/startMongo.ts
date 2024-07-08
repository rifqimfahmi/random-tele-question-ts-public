import { connect } from 'mongoose'
import {config} from "@/config/config";
import {logger} from "@/logger";

export default async function () {
    await connect(config.mongoUri)
    logger.info("Connected to database")
}