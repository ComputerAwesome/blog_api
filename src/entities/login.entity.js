export default function EntityFactory(validation, hash, createEntityObject) {
  return function Entity({ email, password }) {
    return new Promise((resolve, reject) => {
      try {
        if (!email || validation.isEmpty(email))
          reject(createEntityObject({ msg: "email is required!", validationError: true }));

        if (!password || validation.isEmpty(password) || password.length < 8)
          reject(
            createEntityObject({
              msg: "password is required! and password should be at least 8 characters",
              validationError: true
            })
          );

        const userData = Object.freeze({
          email,
          password: hash(password)
        });

        resolve(createEntityObject({ validationError: false, status: 200, data: userData }));
      } catch (err) {
        reject(err);
      }
    });
  };
}
