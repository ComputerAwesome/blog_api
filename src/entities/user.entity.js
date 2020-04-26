export default function EntityFactory(validation, hash, createEntityObject, defaultImageUri) {
  return function Entity({ profilePic, username, email, phone, password }) {
    return new Promise((resolve, reject) => {
      try {
        if (!profilePic || validation.isEmpty(profilePic)) profilePic = defaultImageUri

        if (!username || validation.isEmpty(username))
          reject(createEntityObject({ msg: "username is required!", validationError: true }))

        if (!email || validation.isEmpty(email))
          reject(createEntityObject({ msg: "email is required!", validationError: true }))

        if (!phone || validation.isEmpty(phone))
          reject(createEntityObject({ msg: "phone is required!", validationError: true }))

        if (!password || validation.isEmpty(password) || password.length < 8)
          reject(
            createEntityObject({
              msg: "password is required! and password should be at least 8 characters",
              validationError: true
            })
          )

        const userData = Object.freeze({
          username,
          email,
          phone,
          password: hash(password),
          profilePic
        })

        resolve(createEntityObject({ validationError: false, status: 200, data: userData }))
      } catch (err) {
        reject(err)
      }
    })
  }
}
