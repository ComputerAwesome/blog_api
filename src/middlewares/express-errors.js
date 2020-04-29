import createError from 'http-errors';

export function catchNotFoundErrors(req = {}, res = {}, next) {
  if (req.path.includes('images')) {
    next('image not found', createError(404));
  }
  next('not found', createError(404));
}

export function handelHttpErrors(err, req = null, res) {
  if (!err.status) err.status = 404;
  res.json(err);
}
