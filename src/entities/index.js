import validation from "../validations";
import { hash } from "../security/crypto";
import userEntityFactory from "./user.entity";
import loginEntityFactory from "./login.entity";
import postEntiityFactory from "./post.entity";
import { appendValidationError } from "../functions/entity.helpers";

export const userEntity = userEntityFactory(validation, hash, appendValidationError);
export const loginEntity = loginEntityFactory(validation, hash, appendValidationError);
export const postEntity = postEntiityFactory(validation, hash, appendValidationError);
