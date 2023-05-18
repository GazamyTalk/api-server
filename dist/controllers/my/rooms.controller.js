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
exports.exitRoom = exports.patchRoom = exports.enterRoom = exports.getRoomInfos = void 0;
const rooms_service_1 = __importStar(require("../../services/my/rooms.service"));
const shared_db_1 = require("shared-db");
function getRoomInfos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomInfos = yield rooms_service_1.default.getRoomInfos(username);
        res.send({ status: 200, success: true, roomInfos: roomInfos });
    });
}
exports.getRoomInfos = getRoomInfos;
function enterRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomid = req.body.roomid;
        if (!(typeof roomid === "string" ||
            typeof roomid === "undefined")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield rooms_service_1.default.enterRoom(username, roomid ? new shared_db_1.RoomId(roomid) : undefined);
        if (result instanceof Error) {
            res.send({ status: 400, success: false, error: result.message });
            return;
        }
        else {
            res.send({ status: 200, success: true, roomid: result });
            return;
        }
    });
}
exports.enterRoom = enterRoom;
function patchRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomid = req.body.roomid;
        const patchData = req.body.patchData;
        if (!(typeof roomid === "string" &&
            typeof patchData === "object" &&
            (0, rooms_service_1.isMutablePatchData)(patchData))) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield rooms_service_1.default.patchRoom(username, new shared_db_1.RoomId(roomid), patchData);
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
exports.patchRoom = patchRoom;
function exitRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomid = req.body.roomid;
        if (!(typeof roomid === "string")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield rooms_service_1.default.exitRoom(username, new shared_db_1.RoomId(roomid));
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
exports.exitRoom = exitRoom;
