import express from "express";
import cors from "cors";
import { PORT } from "./configs/env";
import { createServerListener } from "./utils";
import app from "./app";

// creating express instance
const server = express();
// configuring cross origin
server.use(cors());
// allow json data
server.use(express.json());
// using x.www form urlencoded
server.use(express.urlencoded({ extended: false }));
// running express application
app(server);
// create app listener
server.listen(PORT, createServerListener(PORT));
