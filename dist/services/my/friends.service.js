"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.getFriendsInfo = void 0;
const connection_1 = require("../../config/connection");
const otherUserInfo_1 = require("../../models/otherUserInfo");
const shared_db_1 = __importDefault(require("shared-db"));
function getFriendsInfo(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig });
        const userInfo = yield sharedDB.users.getInfo(username);
        const friends = userInfo.friends;
        const friendsInfo = yield sharedDB.users.getInfos(friends);
        yield sharedDB.close();
        return friendsInfo.map(otherUserInfo_1.toOtherUserInfo);
    });
}
exports.getFriendsInfo = getFriendsInfo;
// 문제점: 존재하지 않는 사람도 친구추가 가능. 단, 이것이 문제되지는 않음.
function addFriend(username, friendname) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig });
        if (!(yield sharedDB.users.isExist(friendname))) {
            yield sharedDB.close();
            return new Error("not exist user");
        }
        if (yield sharedDB.users.isFriend(username, friendname)) {
            yield sharedDB.close();
            return new Error("already friend");
        }
        yield sharedDB.users.addFriend(username, friendname);
        yield sharedDB.close();
        return true;
    });
}
exports.addFriend = addFriend;
function removeFriend(username, friendname) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig });
        if (!(yield sharedDB.users.isFriend(username, friendname))) {
            yield sharedDB.close();
            return new Error("not a friend");
        }
        yield sharedDB.users.removeFriend(username, friendname);
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
