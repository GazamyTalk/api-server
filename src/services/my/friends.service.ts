import { mainDBConfig } from "@config/connection";
import { OtherUserInfo, toOtherUserInfo } from "@models/otherUserInfo";
import SharedDB from "shared-db";

export async function getFriendsInfo(username: string) : Promise<OtherUserInfo[]> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    const userInfo = await sharedDB.users.getInfo(username);
    const friends = userInfo.friends;
    const friendsInfo = await sharedDB.users.getInfos(friends);
    await sharedDB.close();
    return friendsInfo.map(toOtherUserInfo);
}

// 문제점: 존재하지 않는 사람도 친구추가 가능. 단, 이것이 문제되지는 않음.
export async function addFriend(username: string, friendname: string) : Promise<Error | true> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if ( !(await sharedDB.users.isExist(friendname)) ) {
        await sharedDB.close();
        return new Error("not exist user");
    }
    if ( await sharedDB.users.isFriend(username, friendname) ) {
        await sharedDB.close();
        return new Error("already friend");
    }
    await sharedDB.users.addFriend(username, friendname);
    await sharedDB.close();
    return true;
}

export async function removeFriend(username: string, friendname: string) : Promise<Error | true> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if ( !await sharedDB.users.isFriend(username, friendname) ) {
        await sharedDB.close();
        return new Error("not a friend");
    }
    await sharedDB.users.removeFriend(username, friendname);
    await sharedDB.close();
    return true;
}

export default {
    getFriendsInfo,
    addFriend,
    removeFriend,
}