// export interface UserInfo {
//     username: string
//     nickname: string
//     description: string
//     rooms: number[]
//     friends: string[]
// }

import { UserInfo } from "shared-db";

export interface OtherUserInfo {
    username: string,
    nickname: string,
    description: string,
    userImage: string,
}

export function toOtherUserInfo(userInfo: UserInfo) : OtherUserInfo {
    return {
        username: userInfo.username,
        nickname: userInfo.nickname,
        description: userInfo.description,
        userImage: userInfo.userImage,
    }
}