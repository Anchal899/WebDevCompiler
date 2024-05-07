import express from "express"
import { saveCode,loadCode } from "../controllers/compilerController";
import { Code } from "../models/Code";

export const compilerRouter=express.Router();

compilerRouter.post("/save",saveCode);
compilerRouter.post("/load",loadCode);
