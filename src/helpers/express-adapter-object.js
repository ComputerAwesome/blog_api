export default function expressAdapterObject(object) {
  return function execute(controller) {
    try {
      controller(object.req)
        .then((res) => {
          const { status, ...data } = res;
          object.res.status(status || 200).json(data);
        })
        .catch((err) => {
          const { status, ...data } = err;
          object.res.status(status || 500).json(data);
        });
    } catch (err) {
      object.next(err);
    }
  };
}
