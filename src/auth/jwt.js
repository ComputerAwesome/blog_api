import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {  JWT_KEY} from '../configs/auth'

// create and export hash function
export function createHash(item) {
  return crypto
    .createHash('md5')
    .update(item)
    .digest('hex')
}

const options = {
  expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
}

// ========== unused function ==========

// export function compareHash(text, hash) {
//   return hash === createHash(text)
// }

export function createCredentials(data) {
  return new Promise((resolve, reject) => {
    try {
      // sign a token to data
      const token = jwt.sign(data, JWT_KEY, options)

      // returns iat, exp and data;
      const info = jwt.decode(token)

      delete info.password
      // returns info + token
      resolve({ data: { ...info, token }, credentialError: false })
    } catch (err) {
      reject({ credentialError: true, err })
    }
  })
}

export function decodeToken(token) {
  return jwt.verify(token, JWT_KEY)
}

export function verifyCredentials(token) {
  return new Promise((resolve, reject) => {
    try {
      let info = jwt.verify(token, JWT_KEY)
      if (!info) {
        reject({
          hasAuthenticationError: true,
          msg: 'invalid token',
        })
      } else if (info.exp < Math.floor(Date.now() / 1000)) {
        reject({
          hasAuthenticationError: true,
          msg: 'expired token',
        })
      } else {
        resolve({
          hasAuthenticationError: false,
          msg: 'authentication succuss ',
          user: info,
        })
      }
    } catch (err) {
      reject({ hasAuthenticationError: true })
    }
  })
}