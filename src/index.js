import express, { urlencoded, json } from "express";
import cors from "cors";
import { PORT } from "./configs/env";
import { createServerListener, logger } from "./utils";
import { catch404Requests, handelHttpErrors } from "./errors";
import path from "path";
import routes from "./routes";
// invoke express application

const server = express();
// handle cross origin requests
server.use(cors());

// // accept json data
server.use(json());
server.use(urlencoded({ extended: false }));

// // logger
logger(server);

// static file path
server.use("/api/images/", express.static(path.join(__dirname, "./static")));

// serverend all microServices
server.use(routes);

// catch 404 errors
catch404Requests(server);

// handle http errors
handelHttpErrors(server);

// create server listener
server.listen(PORT, createServerListener(PORT));
