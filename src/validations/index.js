import validation from "validator"

export function isEmpty(filed) {
  return validation.isEmpty(filed)
}
export function isValidEmail(filed) {
  return validation.isEmail(filed)
}

export default {
  isEmpty
}
