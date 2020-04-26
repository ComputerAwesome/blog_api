import { postEntity } from "../entities";

export default function UseCaseFactory(model, { insert }) {
  return function UseCase(data) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        const entityData = await postEntity(data);

        if (entityData.validationError) reject(entityData);

        const dbProcess = await insert(model, entityData.data);

        if (dbProcess.hasDatabaseError) reject(dbProcess);

        delete dbProcess.data._doc._id;
        delete dbProcess.data._doc.__v;
        delete dbProcess.data._doc.createdBy._doc.password;
        delete dbProcess.data._doc.createdBy._doc._id;

        resolve({
          status: 201,
          msg: "post created",
          data: dbProcess.data._doc
        });
      } catch (err) {
        reject(err.msg ? { msg: err.msg, status: 500 } : { msg: "server error", status: 500 });
      }
    });
  };
}
