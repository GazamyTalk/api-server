import MainDB, { RoomId, RoomInfo } from "@databases/main";

export async function getRoomInfos(roomids: RoomId[]) : Promise<RoomInfo[]> {
    const mainDB = await MainDB.create();
    const result = await mainDB.rooms.getInfos(roomids);
    await mainDB.close();
    return result;
}

export default {
    getRoomInfos,
}