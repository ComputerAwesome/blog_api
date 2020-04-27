import { loginEntity } from "../entities";

export default function UseCaseFactory({ findOne }) {
  return function UseCase(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const entityData = await loginEntity(data);
        if (entityData.validationError) reject(entityData);
        const exists = await findOne({ email: entityData.data.email });
        if (exists.hasDatabaseError) reject(exists);
        if (!exists.data) reject({ msg: "no user found with this email!", status: 404 });
        if (exists.data.password !== entityData.data.password)
          reject({ msg: "incorrect password", status: 401 });

        delete exists.data._doc.password;
        delete exists.data._doc.__v;
        delete exists.data._doc.profilePic;
        delete exists.data._doc.phone;
        delete exists.data._doc.email;

        resolve({
          status: 201,
          msg: "signed up successfully!",
          data: exists.data._doc,
        });
      } catch (err) {
        delete err.validationError;

        reject(
          err.errors
            ? { errors: err.errors, status: 500 }
            : { msg: "internal server error", status: 500 }
        );
      }
    });
  };
}
