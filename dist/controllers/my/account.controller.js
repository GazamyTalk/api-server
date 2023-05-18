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
exports.deleteAccount = exports.patchAccount = exports.createAccount = exports.getAccount = void 0;
const account_service_1 = __importDefault(require("../../services/my/account.service"));
function getAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const account = yield account_service_1.default.getAccount(username);
        res.send({ status: 200, success: true, userInfo: account });
    });
}
exports.getAccount = getAccount;
function createAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const nickname = req.body.nickname;
        if (!(typeof username === "string" &&
            typeof password === "string" &&
            typeof nickname === "string")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield account_service_1.default.createAccount(username, password, nickname);
        if (result === true) {
            res.send({ status: 201, success: true });
            return;
        }
        else {
            res.send({ status: 400, success: false, error: result.message });
        }
    });
}
exports.createAccount = createAccount;
function patchAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        const patchData = req.body.patchData;
        if (!(typeof patchData === "object" &&
            account_service_1.default.isMutablePatchData(patchData))) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        yield account_service_1.default.patchAccount(username, patchData);
        res.send({ status: 200, success: true });
    });
}
exports.patchAccount = patchAccount;
function deleteAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.session.username;
        yield account_service_1.default.deleteAccount(username);
        req.session.destroy((err) => {
            if (err)
                throw err;
            res.send({ status: 200, success: true });
        });
    });
}
exports.deleteAccount = deleteAccount;
