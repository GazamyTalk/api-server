"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultServerConfig = exports.defaultNames = exports.defaultImagePaths = void 0;
const helpers_1 = require("./helpers");
exports.defaultImagePaths = {
    user: process.env.DEFAULT_USER_IMAGE_PATH,
    room: process.env.DEFAULT_ROOM_IMAGE_PATH,
};
(0, helpers_1.assertValue)(exports.defaultImagePaths, "defaultImagePaths");
exports.defaultNames = {
    roomname: (_a = process.env.DEFAULT_ROOM_NAME) !== null && _a !== void 0 ? _a : "Gazamy Room",
};
(0, helpers_1.assertValue)(exports.defaultNames, "defaultNames");
exports.defaultServerConfig = {
    usernameMaxLength: Number.parseInt(process.env.DEFAULT_USERNAME_MAX_LENGTH),
};
(0, helpers_1.assertValue)(exports.defaultServerConfig, "defaultServerConfig", [undefined, NaN]);
