import signupUseCaseFactory from './signup';
import loginUseCaseFactory from './login';
import addPostUseCaseFactory from './add-post';
import getPostsUseCaseFactory from './get-posts';
import getOnePostUseCaseFactory from './get-post';
import {BlogRepo, UserRepo} from '../database';

export const signupUseCase = signupUseCaseFactory(UserRepo);
export const loginUseCase = loginUseCaseFactory(UserRepo);
export const addPostUseCase = addPostUseCaseFactory(BlogRepo);
export const getPostsUseCase = getPostsUseCaseFactory(BlogRepo);
export const getOnePostUseCase = getOnePostUseCaseFactory(BlogRepo);
