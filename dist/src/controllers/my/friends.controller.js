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
const friends_service_1 = __importDefault(require("../../services/my/friends.service"));
function getFriendsInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const friendsInfo = yield friends_service_1.default.getFriendsInfo(username);
        res.send({ status: 200, success: true, otherUserInfos: friendsInfo });
    });
}
exports.getFriendsInfo = getFriendsInfo;
function addFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const friendname = req.body.username;
        const result = yield friends_service_1.default.addFriend(username, friendname);
        if (result === true) {
            res.send({ status: 201, success: true });
            return;
        }
        else {
            res.send({ status: 400, success: false, error: result.message });
            return;
        }
    });
}
exports.addFriend = addFriend;
function removeFriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const friendname = req.body.username;
        const result = yield friends_service_1.default.removeFriend(username, friendname);
        if (result === true) {
            res.send({ status: 200, success: true });
            return;
        }
        else {
            res.send({ status: 400, success: true, error: result.message });
            return;
        }
    });
}
exports.removeFriend = removeFriend;
