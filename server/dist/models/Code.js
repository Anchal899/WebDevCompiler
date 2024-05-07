"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//mongoose structure
//we are defining full code again because we want to make sure that it uses correct datatypes, Or suppose we want to make any field important etc.
const CodeSchema = new mongoose_1.default.Schema({
    fullCode: {
        html: String,
        css: String,
        javascript: String,
    }
});
//CREATED THE TABLE IN MONGODB
exports.Code = mongoose_1.default.model("Code", CodeSchema);
