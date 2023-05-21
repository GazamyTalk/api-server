import SharedDB from "shared-db";
import { mainDBConfig } from "../../config/database";
import { RoomId, RoomInfo } from "shared-db";

export async function getRoomInfos(roomids: RoomId[]) : Promise<RoomInfo[]> {
    const mainDB: SharedDB = await SharedDB.create({ mainDB: mainDBConfig });
    const result = await mainDB.rooms.getInfos(roomids);
    await mainDB.close();
    return result;
}

export default {
    getRoomInfos,
}