export default function UseCaseFactory({ findMany }) {
  return function UseCase() {
    return new Promise(async (resolve, reject) => {
      try {
        const dbProcess = await findMany();
        // console.log(dbProcess);

        if (dbProcess.hasDatabaseError) reject(dbProcess);

        const data = dbProcess.data.map(function (post) {
          delete post.createdBy._doc.password;
          delete post.createdBy._doc._id;
          delete post.createdBy._doc.__v;
          delete post._doc._id;
          delete post._doc.__v;
          return post._doc;
        });

        resolve({
          status: 200,
          msg: "fetch all posts",
          data,
        });
      } catch (err) {
        reject(err.msg ? { msg: err.msg, status: 500 } : { msg: "server error", status: 500 });
      }
    });
  };
}
