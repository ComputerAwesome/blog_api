import { deleteImageIfError } from '../functions/fs'
export default function ControllerFactory(useCase) {
  return function Controller({ body, file }) {
    return new Promise((resolve, reject) => {
      useCase({ ...body, profilePic: file.filename })
        .then(resolve)
        .catch(err => {
          deleteImageIfError(file.filename)
          reject(err)
        })
    })
  }
}
