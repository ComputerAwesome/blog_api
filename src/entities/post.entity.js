export default function EntityFactory(validation, hash, appendValidationError) {
  return function Entity({
    createdIn = Date.now(),
    updatedIn = Date.now(),
    postTitle,
    postImage,
    post,
    createdBy,
    published = true,
  }) {
    return new Promise((resolve, reject) => {
      try {
        const { pushError, getAllErrors } = appendValidationError();
        if (!postTitle || validation.isEmpty(postTitle)) pushError("post title is required!");

        if (!postImage || validation.isEmpty(postImage)) pushError("post image is required!");

        if (!post || validation.isEmpty(post)) pushError("post is required!");

        if (!createdBy || validation.isEmpty(createdBy)) pushError("user id is required!");

        let errors = getAllErrors();

        if (errors.validationError) reject({ validationError: true, errors: errors.entityErrors });

        const data = Object.freeze({
          createdBy,
          createdIn,
          updatedIn,
          postTitle,
          postImage,
          post,
          published,
          postHash: hash(postTitle),
        });

        resolve({ data, status: 201, validationError: false });
      } catch (err) {
        reject(err);
      }
    });
  };
}
