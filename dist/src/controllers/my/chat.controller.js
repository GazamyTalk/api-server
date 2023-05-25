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
exports.getChatInfos = void 0;
const chat_service_1 = __importDefault(require("../../services/my/chat.service"));
const shared_db_1 = require("shared-db");
function getChatInfos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const roomid = req.body.roomid;
        const toDateTime = req.body.toDateTime;
        const count = req.body.count;
        if (!(typeof roomid === "string" &&
            typeof toDateTime === "number" &&
            typeof count === "number")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield chat_service_1.default.getChatInfos(username, new shared_db_1.RoomId(roomid), toDateTime, count);
        if (result instanceof Error) {
            res.send({ status: 400, success: false, error: result.message });
            return;
        }
        else {
            res.send({ status: 200, success: true, chatInfos: result });
            return;
        }
    });
}
exports.getChatInfos = getChatInfos;
