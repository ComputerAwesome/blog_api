export function createServerListener(PORT) {
  console.log(`Open Node server at post ${PORT} use localhost if you are in local environment`);
}

export function logger(app) {
  app.use((req, res, next) => {
    console.log(req.method, req.path);

    next();
  });
}
