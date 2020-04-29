export default function ControllerFactory(useCase) {
  return function Controller({params}) {
    return new Promise((resolve, reject) => {
      try {
        useCase(params)
            .then(resolve)
            .catch(reject);
      } catch (err) {
        throw new Error(err);
      }
    });
  };
}
