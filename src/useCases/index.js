import signupUseCaseFactory from "./signup";
import loginUseCaseFactory from "./login";
import addPostUseCaseFactory from "./add-post";
import getPostsUseCaseFactory from "./get-posts";
import getOnePostUseCaseFactory from "./get-post";
import databaseAdapters, { UserModel, PostModel, UserRepo } from "../database";

export const signupUseCase = signupUseCaseFactory(UserModel, databaseAdapters);
export const loginUseCase = loginUseCaseFactory(UserRepo);
export const addPostUseCase = addPostUseCaseFactory(PostModel, databaseAdapters);
export const getPostsUseCase = getPostsUseCaseFactory(PostModel, databaseAdapters);
export const getOnePostUseCase = getOnePostUseCaseFactory(PostModel, databaseAdapters);
