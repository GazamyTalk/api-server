import MainDB, { RoomId, RoomInfo } from "@databases/main";
import { mutableRoomInfoFields } from "@databases/main/models/RoomInfo";

export async function getRoomInfos(username: string) : Promise<RoomInfo[]> {
    const mainDB = await MainDB.create();
    const roomids = (await mainDB.users.getInfo(username)).rooms;
    const roomInfos = await mainDB.rooms.getInfos(roomids);
    await mainDB.close();
    return roomInfos;
}

export async function enterRoom(username: string, roomid?: RoomId) : Promise<Error | true> {
    const mainDB = await MainDB.create();

    if ( roomid === undefined ) {
        roomid = await mainDB.rooms.create();
    } else {
        if ( await mainDB.rooms.isExist(roomid) ) {
            await mainDB.close();
            return new Error("not exist room");
        }
        if ( await mainDB.users.isInRoom(username, roomid) ) {
            await mainDB.close();
            return new Error("user already in room");
        }
    }

    await mainDB.rooms.userEnter(roomid, username);
    await mainDB.users.enterRoom(username, roomid);
    await mainDB.close();
    return true;
}

export async function patchRoom(username: string, roomid: RoomId, patchData: Partial<RoomInfo>) : Promise<Error | true> {
    const mainDB = await MainDB.create();
    if ( !(await mainDB.rooms.isExist(roomid)) ) {
        await mainDB.close();
        return new Error("not exist room");
    }
    if ( !(await mainDB.users.isInRoom(username, roomid)) ) {
        await mainDB.close();
        return new Error("user not in room");
    }
    await mainDB.rooms.setInfo(roomid, patchData);
    await mainDB.close();
    return true;
}

export async function exitRoom(username: string, roomid: RoomId) : Promise<true | Error> {
    const mainDB = await MainDB.create();
    if ( await mainDB.rooms.isExist(roomid) ) {
        await mainDB.close();
        return new Error("not exist room");
    }
    if ( !await mainDB.users.isInRoom(username, roomid) ) {
        await mainDB.close();
        return new Error("user not in room");
    }
    await mainDB.rooms.userExit(roomid, username);
    await mainDB.users.exitRoom(username, roomid);
    await mainDB.close();
    return true;
}

export function isMutablePatchData(patchData: Partial<RoomInfo>) : boolean {
    return Object.keys(patchData).every((value) => mutableRoomInfoFields.includes(value))
        && Object.values(patchData).every((value) => typeof value === "string");
}

export default {
    getRoomInfos,
    enterRoom,
    patchRoom,
    exitRoom,
    isMutablePatchData,
}