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
exports.isMutablePatchData = exports.deleteAccount = exports.patchAccount = exports.createAccount = exports.getAccount = void 0;
const connection_1 = require("../../config/connection");
const defaults_1 = require("../../config/defaults");
const shared_db_1 = __importDefault(require("shared-db"));
const UserInfo_1 = require("shared-db/lib/databases/main/models/UserInfo");
function getAccount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig });
        const userInfo = yield sharedDB.users.getInfo(username);
        yield sharedDB.close();
        return userInfo;
    });
}
exports.getAccount = getAccount;
function createAccount(username, password, nickname) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig, loginDB: connection_1.loginDBConfig });
        if (yield sharedDB.login.isExist(username)) {
            yield sharedDB.close();
            return new Error("already exist user");
        }
        yield sharedDB.login.create(username, password);
        yield sharedDB.users.create(username, nickname, defaults_1.defaultImagePaths.user);
        yield sharedDB.close();
        return true;
    });
}
exports.createAccount = createAccount;
function patchAccount(username, patchData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig });
        yield sharedDB.users.setInfo(username, patchData);
        yield sharedDB.close();
    });
}
exports.patchAccount = patchAccount;
function deleteAccount(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: connection_1.mainDBConfig, loginDB: connection_1.loginDBConfig });
        // await sharedDB.users.removeFriendFromAll(username);
        // await sharedDB.rooms.userExitFromAll(username);
        const roomids = (yield sharedDB.users.getInfo(username)).rooms;
        yield sharedDB.rooms.exitRooms(roomids, username);
        yield sharedDB.rooms.removeEmptyRooms(roomids);
        yield sharedDB.users.remove(username);
        yield sharedDB.login.remove(username);
        yield sharedDB.close();
    });
}
exports.deleteAccount = deleteAccount;
function isMutablePatchData(patchData) {
    return Object.keys(patchData).every((value) => UserInfo_1.mutableUserInfoFields.includes(value))
        && Object.values(patchData).every((value) => typeof value === "string");
}
exports.isMutablePatchData = isMutablePatchData;
exports.default = {
    getAccount,
    createAccount,
    patchAccount,
    deleteAccount,
    isMutablePatchData,
};
