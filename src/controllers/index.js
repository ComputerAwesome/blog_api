import signupControllerFactory from './signup';
import loginControllerFactory from './login';
import addPostControllerFactory from './add-post';
import getPostsControllerFactory from './get-posts';
import getOnePostControllerFactory from './get-post';

import {
  signupUseCase,
  loginUseCase,
  addPostUseCase,
  getPostsUseCase,
  getOnePostUseCase,
} from '../useCases';
import {createCredentials} from '../auth';

export const signup = signupControllerFactory(signupUseCase); // controller
export const login = loginControllerFactory(loginUseCase, createCredentials); // token & sessions
export const addPost = addPostControllerFactory(addPostUseCase);
export const getPosts = getPostsControllerFactory(getPostsUseCase);
export const getOnePost = getOnePostControllerFactory(getOnePostUseCase);
