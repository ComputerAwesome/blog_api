import databaseAdapters from "./database-adapters";
import { DB_URL, options } from "../configs/db";
import mongoose from "mongoose";

import UserRepo from "./user-repo";
import BlogRepo from "./blog-repo";

export { UserRepo, BlogRepo };

export default databaseAdapters(mongoose, DB_URL, options);
