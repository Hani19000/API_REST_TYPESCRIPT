import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./router";


dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500'
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
mongoose.connection.on("error", (error : Error) => {
    console.error(error);
});

app.use("/", router());