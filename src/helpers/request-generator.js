export default function (req, res, next) {
  return {
    req: {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      ip: req.ip,
      host: req.hostname,
    },
    res: {
      send: function (msg) {
        res.send(msg);
        return this;
      },
      json: function (data) {
        res.json(data);
        return this;
      },
      status: function (st) {
        res.status(st);
        return this;
      },
    },
    next: function (err) {
      next(err);
      return this;
    },
  };
}
