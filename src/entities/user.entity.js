export default function EntityFactory(validation, hash, appendValidationError) {
  return function Entity({profilePic, username, email, phone, password}) {
    return new Promise((resolve, reject) => {
      try {
        const {pushError, getAllErrors} = appendValidationError();

        if (!username || validation.isEmpty(username)) pushError('username is required!');

        if (!profilePic || validation.isEmpty(profilePic)) pushError('profile image is required!');

        if (!email || validation.isEmpty(email)) pushError('email is required!');

        if (!phone || validation.isEmpty(phone)) pushError('phone is required!');

        if (!password || validation.isEmpty(password) || password.length < 8) {
          pushError('password is required! and password should be at least 8 characters');
        }

        const errors = getAllErrors();
        // console.log(errors);

        if (errors.validationError) reject({validationError: true, errors: errors.entityErrors});

        const userData = Object.freeze({
          username,
          email,
          phone,
          password: hash(password),
          profilePic,
        });

        resolve({validationError: false, status: 201, data: userData});
      } catch (err) {
        reject(err);
      }
    });
  };
}
