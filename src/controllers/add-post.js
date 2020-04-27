import { deleteImageIfError } from "../functions/fs";
export default function ControllerFactory(useCase) {
  return function Controller({ body, file = {}, params }) {
    return new Promise((resolve, reject) => {
      try {
        const newBody = { ...body };
        const createdBy = params.userId;
        useCase({ ...newBody, postImage: file.filename, createdBy })
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
