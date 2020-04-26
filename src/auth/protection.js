export default function ProtectionProxy(verifyCredentials) {
  return function ProtectionProxy({ headers }) {
    return new Promise(async (resolve, reject) => {
      // get the auth header
      try {
        const authHeader = headers['authorization']

        // if no authHeader reject with 403
        if (!authHeader) reject({ status: 401, msg: 'unauthorized' })

        // extract token from headers
        const token = authHeader.split(' ')[1]

        // validate token is an object if success
        const validateToken = await verifyCredentials(token).catch(err => reject(err))
        // console.log(validateToken)
        // validation success and authentication is true
        resolve(validateToken)
      } catch (err) {
        reject(err)
      }
    })
  }
}