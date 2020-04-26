import crypto from "crypto"

export function hash(filed) {
  return crypto
    .createHash("md5")
    .update(filed)
    .digest("hex")
}
