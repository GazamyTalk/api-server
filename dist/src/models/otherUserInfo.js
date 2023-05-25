"use strict";
// export interface UserInfo {
//     username: string
//     nickname: string
//     description: string
//     rooms: number[]
//     friends: string[]
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOtherUserInfo = void 0;
function toOtherUserInfo(userInfo) {
    return {
        username: userInfo.username,
        nickname: userInfo.nickname,
        description: userInfo.description,
    };
}
exports.toOtherUserInfo = toOtherUserInfo;
