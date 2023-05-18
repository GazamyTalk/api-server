"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err); //debugger
    res.send({ status: 500, success: false, error: "server error" });
};
exports.default = errorHandler;
