"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStoreConfig = exports.chatDBConfig = exports.mainDBConfig = exports.loginDBConfig = void 0;
const helpers_1 = require("./helpers");
exports.loginDBConfig = {
    host: process.env.LOGIN_DB_HOST,
    port: Number.parseInt(process.env.LOGIN_DB_PORT || "0"),
    user: process.env.LOGIN_DB_USER,
    password: process.env.LOGIN_DB_PASSWORD,
    database: process.env.LOGIN_DB_DATABASE
};
(0, helpers_1.assertValue)(exports.loginDBConfig, 'loginDBConfig');
exports.mainDBConfig = {
    uri: process.env.MAIN_DB_URI
};
(0, helpers_1.assertValue)(exports.mainDBConfig, 'mainDBConfig');
exports.chatDBConfig = {
    uri: process.env.CHAT_DB_URI
};
(0, helpers_1.assertValue)(exports.chatDBConfig, 'chatDBConfig');
exports.sessionStoreConfig = {
    url: process.env.SESSION_STORE_URL,
};
(0, helpers_1.assertValue)(exports.sessionStoreConfig, 'sessionStoreConfig', [undefined, NaN]);
