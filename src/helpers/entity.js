export function entityObject({ msg, validationError, data }) {
  return {
    data,
    msg,
    validationError,
  };
}

export function returnedEntityObject({ status = 500, validationError = true, msg, data = null }) {
  return {
    status,
    validationError,
    msg,
    data,
  };
}
