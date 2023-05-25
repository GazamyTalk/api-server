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
exports.getUserInfos = void 0;
const otherUserInfo_1 = require("../../models/otherUserInfo");
const shared_db_1 = __importDefault(require("shared-db"));
const database_1 = require("../../config/database");
function getUserInfos(usernames) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ mainDB: database_1.mainDBConfig });
        const userInfos = yield sharedDB.users.getInfos(usernames);
        const otherUserInfos = userInfos.map(otherUserInfo_1.toOtherUserInfo);
        yield sharedDB.close();
        return otherUserInfos;
    });
}
exports.getUserInfos = getUserInfos;
exports.default = {
    getUserInfos,
};
