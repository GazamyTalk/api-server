import LoginDB from "@databases/login"
import MainDB, { UserInfo } from "@databases/main";
import { mutableUserInfoFields } from "@databases/main/models/UserInfo";

export async function getAccount(username: string) : Promise<UserInfo> {
    const mainDB = await MainDB.create();
    const userInfo = await mainDB.users.getInfo(username);
    await mainDB.close();
    return userInfo;
}

export async function createAccount(username: string, password: string, nickname: string) : Promise<Error | true> {
    const loginDB = await LoginDB.create();
    if ( await loginDB.isExist(username) ) {
        await loginDB.close();
        return new Error("already exist user");
    }

    const mainDB = await MainDB.create();
    await loginDB.create(username, password);
    await mainDB.users.create(username, nickname);

    await loginDB.close();
    await mainDB.close();
    return true;
}

export async function patchAccount(username: string, patchData: Partial<UserInfo>) : Promise<void> {
    const mainDB = await MainDB.create();
    await mainDB.users.setInfo(username, patchData);
    await mainDB.close();
}

export async function deleteAccount(username: string) : Promise<void> {
    const mainDB = await MainDB.create();
    await mainDB.users.remove(username);
    await mainDB.close();
}

export function isMutablePatchData(patchData: Partial<UserInfo>) : boolean {
    return Object.keys(patchData).every((value) => mutableUserInfoFields.includes(value))
        && Object.values(patchData).every((value) => typeof value === "string");
}


export default {
    getAccount,
    createAccount,
    patchAccount,
    deleteAccount,
    isMutablePatchData,
}