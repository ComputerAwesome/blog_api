export default function EntityFactory(validation, hash, appendValidationError) {
  return function Entity({ email, password }) {
    return new Promise((resolve, reject) => {
      try {
        const { pushError, getAllErrors } = appendValidationError();
        if (!email || validation.isEmpty(email)) pushError("email is required!");

        if (!password || validation.isEmpty(password) || password.length < 8)
          pushError("password is required! and password should be at least 8 characters");

        let errors = getAllErrors();

        if (errors.validationError) reject({ validationError: true, errors: errors.entityErrors });

        const userData = Object.freeze({
          email,
          password: hash(password),
        });

        resolve({ data: userData, validationError: false, status: 200 });
      } catch (err) {
        reject(err);
      }
    });
  };
}
