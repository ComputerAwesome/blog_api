export default function EntityFactory(validation, hash, createEntityObject) {
  return function Entity({
    createdIn = Date.now(),
    updatedIn = Date.now(),
    postTitle,
    postImage,
    post,
    createdBy,
    published = true
  }) {
    return new Promise((resolve, reject) => {
      try {
        if (!postTitle || validation.isEmpty(postTitle))
          reject(
            createEntityObject({
              msg: "post title is required!",
              validationError: true
            })
          );

        if (!postImage || validation.isEmpty(postImage))
          reject(
            createEntityObject({
              msg: "post image is required!",
              validationError: true
            })
          );

        if (!post || validation.isEmpty(post))
          reject(
            createEntityObject({
              msg: "post is required!",
              validationError: true
            })
          );

        if (!createdBy || validation.isEmpty(createdBy))
          reject(
            createEntityObject({
              msg: "user id is required!",
              validationError: true
            })
          );

        const data = Object.freeze({
          createdBy,
          createdIn,
          updatedIn,
          postTitle,
          postImage,
          post,
          published,
          postHash: hash(postTitle)
        });

        console.log(data);

        resolve(
          createEntityObject({
            validationError: false,
            status: 200,
            data
          })
        );
      } catch (err) {
        reject(err);
      }
    });
  };
}
