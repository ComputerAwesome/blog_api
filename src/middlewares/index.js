import { catchNotFoundErrors, handelHttpErrors } from "./express-errors";

export default function (app) {
  app.use(catchNotFoundErrors);
  app.use(handelHttpErrors);
}

export function logger(req, res, next) {
  console.log(`${req.method} - ${req.path}`);
  next();
}
