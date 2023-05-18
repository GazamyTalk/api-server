"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireNotAuth = exports.requireAuth = void 0;
function requireAuth(req, res, next) {
    var _a;
    if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.username) === undefined) {
        res.send({ status: 401, success: false, error: "login first" });
        return;
    }
    next();
}
exports.requireAuth = requireAuth;
function requireNotAuth(req, res, next) {
    var _a;
    if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.username) !== undefined) {
        res.send({ status: 409, success: false, error: "already logged in" });
        return;
    }
    next();
}
exports.requireNotAuth = requireNotAuth;
