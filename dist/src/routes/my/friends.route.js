"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../helpers");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const friends_controller_1 = require("../../controllers/my/friends.controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.requireAuth);
router.get('/', (0, helpers_1.wrapAsyncController)(friends_controller_1.getFriendsInfo));
router.post('/', (0, helpers_1.wrapAsyncController)(friends_controller_1.addFriend));
router.delete('/', (0, helpers_1.wrapAsyncController)(friends_controller_1.removeFriend));
exports.default = router;
