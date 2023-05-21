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
exports.addRoomMembers = exports.getRoomMemberInfos = void 0;
const database_1 = require("../../config/database");
const shared_db_1 = __importDefault(require("shared-db"));
function getRoomMemberInfos(username, roomid) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        if (!(yield sharedDB.rooms.isExist(roomid))) {
            yield sharedDB.close();
            return new Error("not exist room");
        }
        if (!(yield sharedDB.users.isInRoom(username, roomid))) {
            yield sharedDB.close();
            return new Error("user not in room");
        }
        const roomInfo = yield sharedDB.rooms.getInfo(roomid);
        const memberInfos = yield sharedDB.users.getInfos(roomInfo.users);
        yield sharedDB.close();
        return memberInfos;
    });
}
exports.getRoomMemberInfos = getRoomMemberInfos;
function addRoomMembers(username, roomid, friendnames) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        if (!(yield sharedDB.rooms.isExist(roomid))) {
            yield sharedDB.close();
            return new Error("not exist room");
        }
        if ((yield sharedDB.users.areFriends(username, friendnames)).some((value) => !value)) {
            yield sharedDB.close();
            return new Error("not a friend");
        }
        if (!(yield sharedDB.users.isInRoom(username, roomid))) {
            yield sharedDB.close();
            return new Error("user not in room");
        }
        // if ( await sharedDB.users.isInRoom(friendname, roomid) ) {
        if ((yield sharedDB.rooms.areMembers(roomid, friendnames)).some((value) => value)) {
            yield sharedDB.close();
            return new Error("friend already in room");
        }
        yield sharedDB.rooms.usersEnterRoom(roomid, friendnames);
        yield sharedDB.users.usersEnterRoom(friendnames, roomid);
        yield sharedDB.close();
        return true;
    });
}
exports.addRoomMembers = addRoomMembers;
exports.default = {
    getRoomMemberInfos,
    addRoomMember: addRoomMembers,
};
