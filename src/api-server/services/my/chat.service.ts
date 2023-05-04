import MainDB from "@databases/main";

export async function getWSToken(username: string) : Promise<string> {
    const mainDB = await MainDB.create();
    const newToken = await mainDB.wsTokens.create(username);
    await mainDB.close();
    return newToken;
}

export default {
    getWSToken,
}