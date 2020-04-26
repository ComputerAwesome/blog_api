import validation from "../validations";
import { entityObject } from "../helpers/entity";
import { hash } from "../security/crypto";
import userEntityFactory from "./user.entity";
import loginEntityFactory from "./login.entity";
import postEntiityFactory from "./post.entity";

export const userEntity = userEntityFactory(validation, hash, entityObject, null);
export const loginEntity = loginEntityFactory(validation, hash, entityObject);
export const postEntity = postEntiityFactory(validation, hash, entityObject);
