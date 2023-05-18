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
exports.tryLogin = void 0;
const connection_1 = require("../config/connection");
const shared_db_1 = __importDefault(require("shared-db"));
function tryLogin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedDB = yield shared_db_1.default.create({ loginDB: connection_1.loginDBConfig });
        const result = yield sharedDB.login.tryLogin(username, password);
        yield sharedDB.close();
        if (result === true) {
            return true;
        }
        else {
            return new Error("not exist user");
        }
    });
}
exports.tryLogin = tryLogin;
exports.default = {
    tryLogin,
};
