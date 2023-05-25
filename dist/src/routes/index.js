"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_1 = __importDefault(require("./my"));
const others_1 = __importDefault(require("./others"));
const auth_1 = __importDefault(require("./auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use('/my', my_1.default);
router.use('/others', others_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
