export default function ControllerFactory(useCase) {
  return function Controller() {
    return new Promise((resolve, reject) => {
      try {
        useCase()
          .then(resolve)
          .catch(reject);
      } catch (err) {
        throw new Error(err);
      }
    });
  };
}
