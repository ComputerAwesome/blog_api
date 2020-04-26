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

        if (exists.data) return reject({ msg: "user already exists!", status: 400 });

        const dbProcess = await insert(model, entityData.data);

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
        reject(err.msg ? { msg: err.msg, status: 500 } : { msg: "server error", status: 500 });
      }
    });
  };
}
