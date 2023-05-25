"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../helpers");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const members_controller_1 = require("../../controllers/my/members.controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.requireAuth);
router.get('/', (0, helpers_1.wrapAsyncController)(members_controller_1.getRoomMemberInfos));
router.post('/', (0, helpers_1.wrapAsyncController)(members_controller_1.addRoomMember));
exports.default = router;
