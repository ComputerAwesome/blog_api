import postModel from './models/post.model';

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
export default (function() {
  function insert(data) {
    return new Promise((resolve, reject) => {
      new postModel(data)
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
      postModel
          .findOne(filter)
          .exec()
          .then((post) => {
            resolve(createResponse(post, null));
          })
          .catch((err) => {
            reject(createResponse(null, err));
          });
    });
  }
  function findMany() {
    return new Promise((resolve, reject) => {
      postModel
          .find()
          .exec()
          .then((posts) => {
            resolve(createResponse(posts, null));
          })
          .catch((err) => {
            reject(createResponse(null, err));
          });
    });
  }
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
