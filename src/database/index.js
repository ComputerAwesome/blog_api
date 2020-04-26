import databaseAdapters from "./database-adapters";
import { DB_URL, options } from "../configs/db";
import mongoose from "mongoose";
import PostModel from "./models/post.model";
import UserModel from "./models/user.model";

import UserRepo from "./user-repo";

export { PostModel, UserModel, UserRepo };

export default databaseAdapters(mongoose, DB_URL, options);
