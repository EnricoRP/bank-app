'use server';

import { ID } from "node-appwrite";
import { createAdminClient } from "../server/appwrite"; 
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION,
    APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION
} = process.env;

export const createTransaction = async (transaction: CreateTransactionProps) => {
    try {
        const { database } = await createAdminClient();
 
        const newTransaction = await database.createDocument(
            DATABASE_ID!,
            TRANSACTION_COLLECTION!,
            ID.unique(),
            {
                channel: 'online',
                category: 'Transfer',
                ...transaction
            }
        );
        return parseStringify(newTransaction);
    } catch (error) {
        console.error(error);
    }
}