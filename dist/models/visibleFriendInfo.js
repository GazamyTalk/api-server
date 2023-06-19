"use strict";
// export interface UserInfo {
//     username: string
//     nickname: string
//     description: string
//     rooms: number[]
//     friends: string[]
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVisibleFriendInfo = void 0;
function toVisibleFriendInfo(userInfo, roomid) {
    return {
        username: userInfo.username,
        nickname: userInfo.nickname,
        description: userInfo.description,
        userImage: userInfo.userImage,
        roomid: roomid
    };
}
exports.toVisibleFriendInfo = toVisibleFriendInfo;
