"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
// middlewares 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use("/api", user_routes_1.default);
app.get("/", (req, res) => {
    res.send("Api working");
});
// error handler 
app.use(error_middleware_1.errorHandler);
exports.default = app;
