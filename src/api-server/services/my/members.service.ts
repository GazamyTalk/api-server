import { OtherUserInfo } from "@api-server/models/otherUserInfo";
import MainDB, { RoomId } from "@databases/main";

export async function getRoomMemberInfos(username: string, roomid: RoomId) : Promise<OtherUserInfo[] | Error> {
    const mainDB = await MainDB.create();
    if ( !(await mainDB.rooms.isExist(roomid)) ) {
        await mainDB.close();
        return new Error("not exist room");
    }
    if ( !(await mainDB.users.isInRoom(username, roomid)) ) {
        await mainDB.close();
        return new Error("user not in room");
    }
    const roomInfo = await mainDB.rooms.getInfo(roomid);
    const memberInfos = await mainDB.users.getInfos(roomInfo.users);
    await mainDB.close();
    return memberInfos;
}

export async function addRoomMember(username: string, roomid: RoomId, friendname: string) : Promise<true | Error> {
    const mainDB = await MainDB.create();
    if (!( await mainDB.rooms.isExist(roomid) )) {
        await mainDB.close();
        return new Error("not exist room");
    }
    if ( await mainDB.users.isFriend(username, friendname) ) {
        await mainDB.close();
        return new Error("not a friend");
    }
    if ( !(await mainDB.users.isInRoom(username, roomid)) ) {
        await mainDB.close();
        return new Error("user not in room");
    }
    if ( await mainDB.users.isInRoom(friendname, roomid) ) {
        await mainDB.close();
        return new Error("friend already in room");
    }
    await mainDB.rooms.userEnter(roomid, friendname);
    await mainDB.users.enterRoom(friendname, roomid);
    await mainDB.close();
    return true;
}

export default {
    getRoomMemberInfos,
    addRoomMember,
}