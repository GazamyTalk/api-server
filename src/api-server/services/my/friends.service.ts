import MainDB from "@databases/main";
import { OtherUserInfo, toOtherUserInfo } from "@api-server/models/otherUserInfo";

export async function getFriendsInfo(username: string) : Promise<OtherUserInfo[]> {
    const mainDB = await MainDB.create();
    const userInfo = await mainDB.users.getInfo(username);
    const friends = userInfo.friends;
    const friendsInfo = await mainDB.users.getInfos(friends);
    await mainDB.close();
    return friendsInfo.map(toOtherUserInfo);
}

// 문제점: 존재하지 않는 사람도 친구추가 가능. 단, 이것이 문제되지는 않음.
export async function addFriend(username: string, friendname: string) : Promise<Error | true> {
    const mainDB = await MainDB.create();
    if ( !(await mainDB.users.isExist(friendname)) ) {
        await mainDB.close();
        return new Error("not exist user");
    }
    if ( await mainDB.users.isFriend(username, friendname) ) {
        await mainDB.close();
        return new Error("already friend");
    }
    await mainDB.users.addFriend(username, friendname);
    await mainDB.close();
    return true;
}

export async function removeFriend(username: string, friendname: string) : Promise<Error | true> {
    const mainDB = await MainDB.create();
    if ( !await mainDB.users.isFriend(username, friendname) ) {
        await mainDB.close();
        return new Error("not a friend");
    }
    await mainDB.users.removeFriend(username, friendname);
    await mainDB.close();
    return true;
}

export default {
    getFriendsInfo,
    addFriend,
    removeFriend,
}