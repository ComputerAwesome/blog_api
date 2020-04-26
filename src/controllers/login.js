export default function ControllerFactory(useCase, createCredentials) {
  return function Controller({ body }) {
    return new Promise((resolve, reject) => {
      useCase(body)
        .then(async (res) => {
          let userCredentials = await createCredentials(res.data);
          if (userCredentials.credentialError) reject({ status: 500 });
          resolve({ status: 200, data: userCredentials.data });
        })
        .catch(reject);
    });
  };
}
