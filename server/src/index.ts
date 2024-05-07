// const express=require("express");
//OR
import express from "express";
import cors from "cors";
import {config} from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRoutes";
const app=express();

//MIDDLEWARE
app.use(express.json());
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
config();

//ROUTES
app.use("/compiler",compilerRouter);

dbConnect();
app.listen(4000,()=>{
    console.log("https://localhost:4000");
});
