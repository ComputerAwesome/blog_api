export function appendValidationError() {
  const entityErrors = [];
  return {
    pushError: (err) => {
      entityErrors.push(err);
    },
    getAllErrors: () => {
      return {entityErrors, validationError: !!entityErrors[0]};
    },
  };
}
