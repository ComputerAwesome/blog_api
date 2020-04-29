export default function ControllerFactory(useCase, createCredentials) {
  return function Controller({body}) {
    return new Promise((resolve, reject) => {
      try {
        useCase(body)
            .then(async (res) => {
              const userCredentials = await createCredentials(res.data);
              if (userCredentials.credentialError) reject({status: 500});
              resolve({status: 200, data: userCredentials.data});
            })
            .catch(reject);
      } catch (err) {
        throw new Error(err);
      }
    });
  };
}
