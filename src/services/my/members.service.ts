import { mainDBConfig } from "../../config/connection";
import { OtherUserInfo } from "../../models/otherUserInfo";
import SharedDB, { RoomId } from "shared-db";

export async function getRoomMemberInfos(username: string, roomid: RoomId) : Promise<OtherUserInfo[] | Error> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if ( !(await sharedDB.rooms.isExist(roomid)) ) {
        await sharedDB.close();
        return new Error("not exist room");
    }
    if ( !(await sharedDB.users.isInRoom(username, roomid)) ) {
        await sharedDB.close();
        return new Error("user not in room");
    }
    const roomInfo = await sharedDB.rooms.getInfo(roomid);
    const memberInfos = await sharedDB.users.getInfos(roomInfo.users);
    await sharedDB.close();
    return memberInfos;
}

export async function addRoomMembers(username: string, roomid: RoomId, friendnames: string[]) : Promise<true | Error> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if (!( await sharedDB.rooms.isExist(roomid) )) {
        await sharedDB.close();
        return new Error("not exist room");
    }
    if ( (await sharedDB.users.areFriends(username, friendnames)).some((value) => !value) ) {
        await sharedDB.close();
        return new Error("not a friend");
    }
    if ( !(await sharedDB.users.isInRoom(username, roomid)) ) {
        await sharedDB.close();
        return new Error("user not in room");
    }
    // if ( await sharedDB.users.isInRoom(friendname, roomid) ) {
    if ( (await sharedDB.rooms.areMembers(roomid, friendnames)).some((value) => value) ) {
        await sharedDB.close();
        return new Error("friend already in room");
    }
    await sharedDB.rooms.usersEnterRoom(roomid, friendnames);
    await sharedDB.users.usersEnterRoom(friendnames, roomid);
    await sharedDB.close();
    return true;
}

export default {
    getRoomMemberInfos,
    addRoomMember: addRoomMembers,
}