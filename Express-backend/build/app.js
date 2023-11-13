"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = __importDefault(require("./utils/env"));
const routes_1 = require("./routes");
const error_middleware_1 = require("./middlewares/error.middleware");
require("./passport/passportStrategies");
const app = (0, express_1.default)();
//default settings
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + "/public"));
app.use((0, cookie_parser_1.default)(env_1.default.signature_cookie));
app.use(routes_1.router);
app.use(error_middleware_1.errorMiddleware);
// const PORT: number = env.port ? parseInt(env.port) : 3001;
// app.listen(PORT, ()=>console.log(`Server ready from PORT ${env.port}`))
const PORT = env_1.default.port ? parseInt(env_1.default.port) : 3001;
app.listen(PORT, () => console.log(`Server ready from PORT ${env_1.default.port}`));
