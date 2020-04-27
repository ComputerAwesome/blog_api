export function createServerListener(PORT) {
  console.log(`Node server port is ${PORT}`);
}

export function logger(app) {
  app.use((req, res, next) => {
    console.log(req.method, req.path);

    next();
  });
}
