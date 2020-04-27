export default function UseCaseFactory({ findOne }) {
  return function UseCase({ postHash }) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbProcess = await findOne({ postHash });

        if (dbProcess.hasDatabaseError) reject(dbProcess);

        delete dbProcess.data._doc._id;
        delete dbProcess.data._doc.__v;
        delete dbProcess.data._doc.createdBy._doc.password;
        delete dbProcess.data._doc.createdBy._doc._id;
        delete dbProcess.data._doc.createdBy._doc.__v;

        resolve({
          status: 200,
          msg: "fetch post",
          data: dbProcess.data._doc,
        });
      } catch (err) {
        reject(err.msg ? { msg: err.msg, status: 500 } : { msg: "server error", status: 500 });
      }
    });
  };
}
