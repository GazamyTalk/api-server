// export interface UserInfo {
//     username: string
//     nickname: string
//     description: string
//     rooms: number[]
//     friends: string[]
// }

import { UserInfo } from "@databases/main";

export interface OtherUserInfo {
    username: string,
    nickname: string,
    description: string
}

export function toOtherUserInfo(userInfo: UserInfo) : OtherUserInfo {
    return {
        username: userInfo.username,
        nickname: userInfo.nickname,
        description: userInfo.description,
    }
}