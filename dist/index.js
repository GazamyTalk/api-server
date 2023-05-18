"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const session_middleware_1 = __importDefault(require("./middlewares/session.middleware"));
const routes_1 = __importDefault(require("./routes"));
const port = (_a = process.env.API_SERVER_PORT) !== null && _a !== void 0 ? _a : 80;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(session_middleware_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//     //debugger
//     console.log('-------------------------------');
//     console.log('req.path:', req.path);
//     console.log('req.method:', req.method);
//     console.log('req.session:', req.session);
//     console.log('req.headers:', req.headers);
//     console.log('req.body:', req.body);
//     next();
// })
app.use('/', routes_1.default);
app.use(error_middleware_1.default);
if (require.main === module) {
    server.listen(port, () => {
        console.log(`server is running at port ${port}`);
    });
}
exports.default = app;
