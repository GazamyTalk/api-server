import { OtherUserInfo, toOtherUserInfo } from "../../models/otherUserInfo";
import SharedDB from "shared-db";
import { mainDBConfig } from "../../config/database";

export async function getUserInfos(usernames: string[]) : Promise<OtherUserInfo[]> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    const userInfos = await sharedDB.users.getInfos(usernames);
    const otherUserInfos = userInfos.map(toOtherUserInfo);
    await sharedDB.close();
    return otherUserInfos;
}

export default {
    getUserInfos,
}