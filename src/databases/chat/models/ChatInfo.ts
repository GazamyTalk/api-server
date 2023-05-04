import { RoomId } from "@databases/main"
import { Types } from "mongoose"

class ChatId extends Types.ObjectId {}

export interface ChatInfo {
    chatid: ChatId
    username: string
    roomid: RoomId
    type: string
    content: string
    time: number
}