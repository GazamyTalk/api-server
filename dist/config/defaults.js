"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultImagePaths = void 0;
const helpers_1 = require("./helpers");
exports.defaultImagePaths = {
    user: process.env.DEFAULT_USER_IMAGE_PATH,
    room: process.env.DEFAULT_ROOM_IMAGE_PATH,
};
(0, helpers_1.assertValue)(exports.defaultImagePaths, "imagePaths");
