"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express=require("express");
//OR
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compilerRoutes_1 = require("./routes/compilerRoutes");
const app = (0, express_1.default)();
//MIDDLEWARE
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
(0, dotenv_1.config)();
//ROUTES
app.use("/compiler", compilerRoutes_1.compilerRouter);
(0, dbConnect_1.dbConnect)();
app.listen(4000, () => {
    console.log("https://localhost:4000");
});
