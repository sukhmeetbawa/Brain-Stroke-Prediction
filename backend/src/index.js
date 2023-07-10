import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { dataRouter } from "./routes/data.js";
import { predictionRouter } from "./routes/prediction.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/prediction", predictionRouter)

mongoose.connect("mongodb://127.0.0.1:27017/stroke-prediction");

app.listen(3001, () => console.log("Server Initialized"));
