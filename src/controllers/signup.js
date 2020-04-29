import {deleteImageIfError} from '../functions/fs';
export default function ControllerFactory(useCase) {
  return function Controller({body, file = {}}) {
    return new Promise((resolve, reject) => {
      try {
        useCase({...body, profilePic: file.filename})
            .then(resolve)
            .catch((err) => {
            file.filename ? deleteImageIfError(file.filename) : null;
            reject(err);
            });
      } catch (err) {
        throw new Error(err);
      }
    });
  };
}
