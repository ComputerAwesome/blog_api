export function createEntityResponse(data, error, status = 500) {
  if (!data) return { error, validationError: true, status };
  return { data, validationError: false, status };
}

export function appendValidationError() {
  let entityErrors = [];
  return {
    pushError: (err) => {
      entityErrors.push(err);
    },
    getAllErrors: () => {
      return { entityErrors, validationError: entityErrors[0] ? true : false };
    },
  };
}
