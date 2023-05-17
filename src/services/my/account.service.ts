import { loginDBConfig, mainDBConfig } from "@config/connection";
import { defaultImagePaths } from "@config/defaults";
import SharedDB, { UserInfo } from "shared-db";
import { mutableUserInfoFields } from "shared-db/lib/databases/main/models/UserInfo";
import roomsService from "./rooms.service";

export async function getAccount(username: string) : Promise<UserInfo> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    const userInfo = await sharedDB.users.getInfo(username);
    await sharedDB.close();
    return userInfo;
}

export async function createAccount(username: string, password: string, nickname: string) : Promise<Error | true> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig, loginDB: loginDBConfig });
    if ( await sharedDB.login.isExist(username) ) {
        await sharedDB.close();
        return new Error("already exist user");
    }

    await sharedDB.login.create(username, password);
    await sharedDB.users.create(username, nickname, defaultImagePaths.user);

    await sharedDB.close();
    return true;
}

export async function patchAccount(username: string, patchData: Partial<UserInfo>) : Promise<void> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    await sharedDB.users.setInfo(username, patchData);
    await sharedDB.close();
}

export async function deleteAccount(username: string) : Promise<void> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig, loginDB: loginDBConfig });

    // await sharedDB.users.removeFriendFromAll(username);
    // await sharedDB.rooms.userExitFromAll(username);
    const roomids = (await sharedDB.users.getInfo(username)).rooms;
    await sharedDB.rooms.exitRooms(roomids, username);
    await sharedDB.rooms.removeEmptyRooms(roomids);

    await sharedDB.users.remove(username);
    await sharedDB.login.remove(username);
    await sharedDB.close();
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