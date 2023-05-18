"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../helpers");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const users_controller_1 = require("../../controllers/others/users.controller");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.requireAuth, (0, helpers_1.wrapAsyncController)(users_controller_1.getUserInfos));
exports.default = router;
