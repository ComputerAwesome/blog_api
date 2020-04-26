import createError from "http-errors"

export function catch404Requests(app) {
  app.use((req, res, next) => {
    next(createError(404))
  })
}

export function handelHttpErrors(app) {
  app.use((err, req, res, next) => {
    console.log(err)
    if (!err.status) err.status = 500
    res.json(err)
  })
}
