import { mainDBConfig } from "@config/connection";
import { defaultImagePaths } from "@config/defaults";
import SharedDB, { RoomInfo, RoomId } from "shared-db";
import { mutableRoomInfoFields } from "shared-db/lib/databases/main/models/RoomInfo";

export async function getRoomInfos(username: string) : Promise<RoomInfo[]> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    const roomids = (await sharedDB.users.getInfo(username)).rooms;
    const roomInfos = await sharedDB.rooms.getInfos(roomids);
    await sharedDB.close();
    return roomInfos;
}

export async function enterRoom(username: string, roomid?: RoomId) : Promise<Error | RoomId> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });

    if ( roomid === undefined ) {
        roomid = await sharedDB.rooms.create(defaultImagePaths.room);
    } else {
        if ( await sharedDB.rooms.isExist(roomid) ) {
            await sharedDB.close();
            return new Error("not exist room");
        }
        if ( await sharedDB.users.isInRoom(username, roomid) ) {
            await sharedDB.close();
            return new Error("user already in room");
        }
    }

    await sharedDB.rooms.userEnter(roomid, username);
    await sharedDB.users.enterRoom(username, roomid);
    await sharedDB.close();
    return roomid;
}

export async function patchRoom(username: string, roomid: RoomId, patchData: Partial<RoomInfo>) : Promise<Error | true> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if ( !(await sharedDB.rooms.isExist(roomid)) ) {
        await sharedDB.close();
        return new Error("not exist room");
    }
    if ( !(await sharedDB.users.isInRoom(username, roomid)) ) {
        await sharedDB.close();
        return new Error("user not in room");
    }
    await sharedDB.rooms.setInfo(roomid, patchData);
    await sharedDB.close();
    return true;
}

export async function exitRoom(username: string, roomid: RoomId) : Promise<true | Error> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    if ( !await sharedDB.rooms.isExist(roomid) ) {
        await sharedDB.close();
        return new Error("not exist room");
    }
    if ( !await sharedDB.users.isInRoom(username, roomid) ) {
        await sharedDB.close();
        return new Error("user not in room");
    }
    await sharedDB.rooms.userExit(roomid, username);
    await sharedDB.users.exitRoom(username, roomid);

    await sharedDB.rooms.removeEmptyRooms([roomid]);

    await sharedDB.close();
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