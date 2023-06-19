"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.getFriendsInfo = void 0;
const database_1 = require("../../config/database");
const defaults_1 = require("../../config/defaults");
const visibleFriendInfo_1 = require("../../models/visibleFriendInfo");
const shared_db_1 = __importStar(require("shared-db"));
function getFriendsInfo(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        const userInfo = yield sharedDB.users.getInfo(username);
        const friends = userInfo.friends.map((value) => value.username);
        const friendsInfo = yield sharedDB.users.getInfos(friends);
        yield sharedDB.close();
        return userInfo.friends.map((value, index) => (0, visibleFriendInfo_1.toVisibleFriendInfo)(friendsInfo[index], value.roomid));
    });
}
exports.getFriendsInfo = getFriendsInfo;
// 문제점: 존재하지 않는 사람도 친구추가 가능. 단, 이것이 문제되지는 않음.
function addFriend(username, friendname) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        if (!(yield sharedDB.users.isExist(friendname))) {
            yield sharedDB.close();
            return new Error("not exist user");
        }
        if (yield sharedDB.users.isFriend(username, friendname)) {
            yield sharedDB.close();
            return new Error("already friend");
        }
        // let roomid = (await sharedDB.users.getInfo(friendname)).friends.find((value) => value.username === username)?.roomid;
        // if ( typeof roomid === "undefined" ) {
        let roomid = (yield sharedDB.rooms.create(defaults_1.defaultImagePaths.room, true)).toString();
        yield sharedDB.users.enterRoom(friendname, new shared_db_1.RoomId(roomid));
        yield sharedDB.rooms.userEnter(new shared_db_1.RoomId(roomid), friendname);
        // }
        yield sharedDB.users.addFriend(username, { username: friendname, roomid: roomid });
        yield sharedDB.users.addFriend(friendname, { username: username, roomid: roomid });
        yield sharedDB.users.enterRoom(username, new shared_db_1.RoomId(roomid));
        yield sharedDB.rooms.userEnter(new shared_db_1.RoomId(roomid), username);
        yield sharedDB.close();
        return true;
    });
}
exports.addFriend = addFriend;
function removeFriend(username, friendname) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        if (!(yield sharedDB.users.isFriend(username, friendname))) {
            yield sharedDB.close();
            return new Error("not a friend");
        }
        const roomid = (_a = (yield sharedDB.users.getInfo(username)).friends.find((value) => value.username === friendname)) === null || _a === void 0 ? void 0 : _a.roomid;
        yield sharedDB.users.removeFriend(username, friendname);
        yield sharedDB.users.removeFriend(friendname, username);
        yield sharedDB.users.exitRoom(username, new shared_db_1.RoomId(roomid));
        yield sharedDB.users.exitRoom(friendname, new shared_db_1.RoomId(roomid));
        yield sharedDB.rooms.remove(new shared_db_1.RoomId(roomid));
        yield sharedDB.chats.removeChatRoom(new shared_db_1.RoomId(roomid));
        yield sharedDB.close();
        return true;
    });
}
exports.removeFriend = removeFriend;
exports.default = {
    getFriendsInfo,
    addFriend,
    removeFriend,
};
