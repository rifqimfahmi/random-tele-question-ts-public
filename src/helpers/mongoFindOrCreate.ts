import mongoose, {FilterQuery} from "mongoose";
import {DocumentType, plugin} from "@typegoose/typegoose";
// @ts-ignore
import findOrCreatePlugin from 'mongoose-findorcreate';

/**
 * Result for the `findOrCreate` function from mongoose-findorcreate
 */
export interface FindOrCreateResult<T> {
    created: boolean;
    doc: DocumentType<T>;
}

/**
 * This class contains all types for the module "mongoose-findorcreate", adjusted for typegoose
 */
@plugin(findOrCreatePlugin)
export abstract class FindOrCreate {
    public static findOrCreate: <T extends FindOrCreate>(
        this: mongoose.Model<T>,
        condition: FilterQuery<T>,
        createWith?: any
    ) => Promise<FindOrCreateResult<T>>;
}