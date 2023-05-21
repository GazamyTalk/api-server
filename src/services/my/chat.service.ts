import { chatDBConfig, mainDBConfig } from "../../config/database";
import SharedDB, { ChatInfo, RoomId } from "shared-db";

export async function getChatInfos(username: string, roomid: RoomId, toDateTime: number, count: number) : Promise<ChatInfo[] | Error> {
    const sharedDB = await SharedDB.create({ mainDB: mainDBConfig, chatDB: chatDBConfig });
    if ( !await sharedDB.users.isInRoom(username, roomid) ) {
        await sharedDB.close();
        return new Error("user not in room");
    }
    const result = await sharedDB.chats.getChat(roomid, count, toDateTime);
    await sharedDB.close();
    return result;
}

export default {
    getChatInfos
}