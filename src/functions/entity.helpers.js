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
