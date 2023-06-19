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
exports.logout = exports.login = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        if (!(typeof username === "string" &&
            typeof password === "string")) {
            res.send({ status: 400, success: false, error: "do not hack" });
            return;
        }
        const result = yield auth_service_1.default.tryLogin(username, password);
        if (result === true) {
            req.session.username = username;
            req.session.save((err) => {
                if (err)
                    throw err;
                // res.set('Access-Control-Allow-Credentials', 'true');
                res.send({ status: 200, success: true });
            });
            return;
        }
        else {
            res.send({ status: 400, success: false, error: result.message });
            return;
        }
    });
}
exports.login = login;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.session.destroy((err) => {
            if (err)
                throw err;
            res.send({ status: 200, success: true });
        });
    });
}
exports.logout = logout;
