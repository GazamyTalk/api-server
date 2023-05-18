"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_route_1 = __importDefault(require("./account.route"));
const friends_route_1 = __importDefault(require("./friends.route"));
const rooms_route_1 = __importDefault(require("./rooms.route"));
const members_route_1 = __importDefault(require("./members.route"));
const chat_route_1 = __importDefault(require("./chat.route"));
const router = express_1.default.Router();
router.use('/account', account_route_1.default);
router.use('/friends', friends_route_1.default);
router.use('/rooms', rooms_route_1.default);
router.use('/members', members_route_1.default);
router.use('/chat', chat_route_1.default);
exports.default = router;
