"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./App/Routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = __importDefault(require("./App/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./App/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('hello word');
});
app.use('/api/v1', Routes_1.default);
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;