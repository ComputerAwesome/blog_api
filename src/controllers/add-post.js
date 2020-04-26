import { deleteImageIfError } from "../functions/fs";
export default function ControllerFactory(useCase) {
  return function Controller({ body, file, params }) {
    return new Promise((resolve, reject) => {
      try {
        const createdBy = params.userId;
        // console.log(createdBy);
        useCase({ ...body, postImage: file.filename, createdBy })
          .then(resolve)
          .catch(err => {
            deleteImageIfError(file.filename);
            reject(err);
          });
      } catch (err) {
        throw new Error(err);
      }
    });
  };
}
