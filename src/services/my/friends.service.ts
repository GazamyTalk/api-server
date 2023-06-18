import { mainDBConfig } from "../../config/database";
import { defaultImagePaths } from "../../config/defaults";
import { OtherUserInfo, toOtherUserInfo } from "../../models/otherUserInfo";
import SharedDB, { RoomId } from "shared-db";

export async function getFriendsInfo(username: string) : Promise<OtherUserInfo[]> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    const userInfo = await sharedDB.users.getInfo(username);
    const friends = userInfo.friends.map((value) => value.username);
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
    // let roomid = (await sharedDB.users.getInfo(friendname)).friends.find((value) => value.username === username)?.roomid;
    // if ( typeof roomid === "undefined" ) {
    let roomid = (await sharedDB.rooms.create(defaultImagePaths.room, true)).toString();
    await sharedDB.users.enterRoom(friendname, new RoomId(roomid));
    await sharedDB.rooms.userEnter(new RoomId(roomid), friendname);
    // }
    await sharedDB.users.addFriend(username, { username: friendname, roomid: roomid });
    await sharedDB.users.addFriend(friendname, { username: username, roomid: roomid });
    await sharedDB.users.enterRoom(username, new RoomId(roomid));
    await sharedDB.rooms.userEnter(new RoomId(roomid), username);
    await sharedDB.close();
    return true;
}

export async function removeFriend(username: string, friendname: string) : Promise<Error | true> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if ( !await sharedDB.users.isFriend(username, friendname) ) {
        await sharedDB.close();
        return new Error("not a friend");
    }
    const roomid = (await sharedDB.users.getInfo(username)).friends.find((value) => value.username === friendname)?.roomid;
    await sharedDB.users.removeFriend(username, friendname);
    await sharedDB.users.removeFriend(friendname, username);
    await sharedDB.users.exitRoom(username, new RoomId(roomid));
    await sharedDB.users.exitRoom(friendname, new RoomId(roomid));
    await sharedDB.rooms.remove(new RoomId(roomid));
    await sharedDB.chats.removeChatRoom(new RoomId(roomid));
    await sharedDB.close();
    return true;
}

export default {
    getFriendsInfo,
    addFriend,
    removeFriend,
}