import { OtherUserInfo, toOtherUserInfo } from "@api-server/models/otherUserInfo";
import MainDB from "@databases/main";

export async function getUserInfos(usernames: string[]) : Promise<OtherUserInfo[]> {
    const mainDB = await MainDB.create();
    const userInfos = await mainDB.users.getInfos(usernames);
    const otherUserInfos = userInfos.map(toOtherUserInfo);
    await mainDB.close();
    return otherUserInfos;
}

export default {
    getUserInfos,
}