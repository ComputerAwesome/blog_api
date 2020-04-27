import { userEntity } from "../entities";

export default function UseCaseFactory({ insert, findOne }) {
  return function UseCase(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const entityData = await userEntity(data);

        if (entityData.validationError) return reject(entityData);

        const exists = await findOne({ email: entityData.data.email });

        if (exists.hasDatabaseError)
          return reject({ msg: "error adding user, please try again later!" });

        if (exists.data) return resolve({ msg: "user already exists!", status: 200 });

        const dbProcess = await insert(entityData.data);

        if (dbProcess.hasDatabaseError) reject(exists);

        delete dbProcess.data._doc.password;
        delete dbProcess.data._doc.profilePic;
        delete dbProcess.data._doc._id;

        resolve({
          status: 201,
          msg: "signed up successfully!",
          data: dbProcess.data._doc,
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
