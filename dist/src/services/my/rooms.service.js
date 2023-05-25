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
exports.isMutablePatchData = exports.exitRoom = exports.patchRoom = exports.enterRoom = exports.getRoomInfos = void 0;
const database_1 = require("../../config/database");
const defaults_1 = require("../../config/defaults");
const shared_db_1 = __importDefault(require("shared-db"));
const RoomInfo_1 = require("shared-db/lib/databases/main/models/RoomInfo");
function getRoomInfos(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        const roomids = (yield sharedDB.users.getInfo(username)).rooms;
        const roomInfos = yield sharedDB.rooms.getInfos(roomids);
        yield sharedDB.close();
        return roomInfos;
    });
}
exports.getRoomInfos = getRoomInfos;
function enterRoom(username, roomid) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        if (roomid === undefined) {
            roomid = yield sharedDB.rooms.create(defaults_1.defaultImagePaths.room);
        }
        else {
            if (yield sharedDB.rooms.isExist(roomid)) {
                yield sharedDB.close();
                return new Error("not exist room");
            }
            if (yield sharedDB.users.isInRoom(username, roomid)) {
                yield sharedDB.close();
                return new Error("user already in room");
            }
        }
        yield sharedDB.rooms.userEnter(roomid, username);
        yield sharedDB.users.enterRoom(username, roomid);
        yield sharedDB.close();
        return roomid;
    });
}
exports.enterRoom = enterRoom;
function patchRoom(username, roomid, patchData) {
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
        yield sharedDB.rooms.setInfo(roomid, patchData);
        yield sharedDB.close();
        return true;
    });
}
exports.patchRoom = patchRoom;
function exitRoom(username, roomid) {
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
        yield sharedDB.rooms.userExit(roomid, username);
        yield sharedDB.users.exitRoom(username, roomid);
        yield sharedDB.rooms.removeEmptyRooms([roomid]);
        yield sharedDB.close();
        return true;
    });
}
exports.exitRoom = exitRoom;
function isMutablePatchData(patchData) {
    return Object.keys(patchData).every((value) => RoomInfo_1.mutableRoomInfoFields.includes(value))
        && Object.values(patchData).every((value) => typeof value === "string");
}
exports.isMutablePatchData = isMutablePatchData;
exports.default = {
    getRoomInfos,
    enterRoom,
    patchRoom,
    exitRoom,
    isMutablePatchData,
};
