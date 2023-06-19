// export interface UserInfo {
//     username: string
//     nickname: string
//     description: string
//     rooms: number[]
//     friends: string[]
// }

import { UserInfo } from "shared-db";

export interface VisibleFriendInfo {
    username: string,
    nickname: string,
    description: string,
    userImage: string,
    roomid: string
}

export function toVisibleFriendInfo(userInfo: UserInfo, roomid: string) : VisibleFriendInfo {
    return {
        username: userInfo.username,
        nickname: userInfo.nickname,
        description: userInfo.description,
        userImage: userInfo.userImage,
        roomid: roomid
    }
}