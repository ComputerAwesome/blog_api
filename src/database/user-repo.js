import userModel from "./models/user.model";

function createResponse(data, err) {
  if (err) {
    return {
      hasDatabaseError: true,
      err,
    };
  }

  return {
    hasDatabaseError: false,
    data,
  };
}

// Exporting IIFE Database factory
export default (function () {
  function insert(data) {
    return new Promise((resolve, reject) => {
      new userModel(data)
        .save()
        .then((user) => {
          resolve(createResponse(user, null));
        })
        .catch((err) => {
          reject(createResponse(null, err));
        });
    });
  }
  function findOne(filter) {
    return new Promise((resolve, reject) => {
      userModel
        .findOne(filter)
        .exec()
        .then((user) => {
          resolve(createResponse(user, null));
        })
        .catch((err) => {
          reject(createResponse(null, err));
        });
    });
  }
  function findMany(filters) {}
  function findOneAndUpdate(filter, data) {}
  function findOneAndDelete(filter) {}

  return {
    insert,
    findOne,
    findMany,
    findOneAndUpdate,
    findOneAndDelete,
  };
})();
