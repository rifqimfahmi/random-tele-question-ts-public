import { connect } from 'mongoose'
import {config} from "@/config/config";

export default async function () {
    await connect(config.mongoUri)
    console.log("Connected to database")
}