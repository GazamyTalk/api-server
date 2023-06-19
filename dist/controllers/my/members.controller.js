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
exports.addRoomMember = exports.getRoomMemberInfos = void 0;
const members_service_1 = __importDefault(require("../../services/my/members.service"));
const shared_db_1 = require("shared-db");
function getRoomMemberInfos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomid = req.query.roomid;
        if (!(typeof roomid === "string")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield members_service_1.default.getRoomMemberInfos(username, new shared_db_1.RoomId(roomid));
        if (result instanceof Error) {
            res.send({ status: 400, success: false, error: result.message });
            return;
        }
        else {
            res.send({ status: 200, success: true, otherUserInfos: result });
            return;
        }
    });
}
exports.getRoomMemberInfos = getRoomMemberInfos;
function addRoomMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomid = req.body.roomid;
        const friendnamesRaw = req.body.username;
        if (!(typeof roomid === "string" &&
            typeof friendnamesRaw === "string")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const friendnames = friendnamesRaw.split(',');
        const result = yield members_service_1.default.addRoomMember(username, new shared_db_1.RoomId(roomid), friendnames);
        if (result === true) {
            res.send({ status: 200, success: true });
            return;
        }
        else {
            res.send({ status: 400, success: false, error: result.message });
            return;
        }
    });
}
exports.addRoomMember = addRoomMember;
