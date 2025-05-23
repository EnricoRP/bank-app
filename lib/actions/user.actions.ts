'use server';
import { ID, Query } from 'node-appwrite';
import { createSessionClient, createAdminClient } from '../server/appwrite';
import { cookies } from 'next/headers';
import { encryptId, extractCustomerIdFromUrl, parseStringify } from '../utils';
import { parse } from 'path';
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from 'plaid';
import { plaidClient } from '../plaid';
import { revalidatePath } from 'next/cache';
import { createDwollaCustomer, addFundingSource, deactivateDwollaCustomer } from './dwolla.actions';

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();
        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION!,
            [Query.equal('userId', [userId])]
        )
        return parseStringify(user.documents[0]);
    } catch (error) {
        console.error(error);
    }
}

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const user = await getUserInfo({ userId: session.userId });
        return { success: true, user: parseStringify(user) };
    } catch (error) {
        if (error instanceof Error) {
            console.error("signIn error:", error.message);
            return { success: false, message: error.message };
        } else {
            console.error("signIn error:", error);
            return { success: false, message: "An unknown error occurred during sign-in." };
        }
    }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;
    let newUserAccount;
    let dwollaCustomerId;
    try {
        const { account, database } = await createAdminClient();
        newUserAccount = await account.create(ID.unique(), userData.email, password, `${userData.firstName} ${userData.lastName}`);
        if (!newUserAccount) {
            throw new Error(' error creating user');
        }

        const dwollaCustomerUrl = await createDwollaCustomer({
            ...userData,
            type: 'personal'
        });

        if (!dwollaCustomerUrl) throw new Error(' error creating Dwolla customer');
        dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl
            }
        );

        const session = await account.createEmailPasswordSession(userData.email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error('error', error)
        if (dwollaCustomerId) {
            try {
                // Menonaktifkan customer Dwolla yang terkait
                await deactivateDwollaCustomer({
                    ...userData,
                    type: 'personal'
                });
                console.log('Dwolla customer deactivated due to error');
            } catch (deactivationError) {
                console.error('Error deactivating Dwolla customer:', deactivationError);
            }
        }
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();
        const user = await getUserInfo({ userId: result.$id });
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');
        await account.deleteSession('current');
    } catch (error) {
        return null
    }
}

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ['auth', 'transactions'] as Products[],
            language: 'en',
            country_codes: ['US'] as CountryCode[],
        }
        const response = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        console.error(error);
    }
}

export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId
}: createBankAccountProps) => {
    try {
        const { database } = await createAdminClient();
        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }
        );

        return parseStringify(bankAccount);
    } catch (error) {
        console.error(error);
    }
}

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;
        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken
        });
        const accountData = accountsResponse.data.accounts[0];

        // Create a processor token for Dwolla use the access token and acount ID
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        };
        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        // Create a funding source URL for the account using the Dwolla customer ID, Processeor token, and bank name.
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name
        });

        if (!fundingSourceUrl) throw new Error("Funding source not found!");

        // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharable ID
        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: encryptId(accountData.account_id)
        });

        // Revalidate the path to reflect the changes
        revalidatePath("/");

        return parseStringify({ publicTokenExchange: 'complete' })
    } catch (error) {
        console.error(error);
    }
}

export const getBank = async ({ documentId }: getBankProps) => {
    try {
        const { database } = await createAdminClient();
        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION!,
            [Query.equal('$id', [documentId])]
        )
        return parseStringify(bank.documents[0]);
    } catch (error) {
        console.error(error);
    }
}

export const getBanks = async ({ userId }: getBanksProps) => {
    try {
        const { database } = await createAdminClient();
        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION!,
            [Query.equal('userId', [userId])]
        )
        return parseStringify(banks.documents);
    } catch (error) {
        console.error(error);
    }
}

export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
    try {
        const { database } = await createAdminClient();
        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION!,
            [Query.equal('accountId', [accountId])]
        )
        return parseStringify(bank.documents[0])
    } catch (error) {
        console.error(error);
    }
}   