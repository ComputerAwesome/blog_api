import { postEntity } from "../entities";

export default function UseCaseFactory({ insert }) {
  return function UseCase(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const entityData = await postEntity(data);

        if (entityData.validationError) reject(entityData);

        const dbProcess = await insert(entityData.data);

        if (dbProcess.hasDatabaseError) reject(dbProcess);

        delete dbProcess.data._doc._id;
        delete dbProcess.data._doc.__v;
        delete dbProcess.data._doc.createdBy._doc.password;
        delete dbProcess.data._doc.createdBy._doc._id;

        resolve({
          status: 201,
          msg: "post created",
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
