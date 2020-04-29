import {DB_URL, options} from '../configs/db';
import mongoose from 'mongoose';

import UserRepo from './user-repo';
import BlogRepo from './blog-repo';

export {UserRepo, BlogRepo};

mongoose.connect(DB_URL, options).then(() => console.log('database connected'));
