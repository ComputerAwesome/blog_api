import ExpressObject from "./express-adapter-object";
import generateHttpObject from "./request-generator";
import { protectionProxy } from "../auth";
/**
 * Public Express Adapter as a Decorated Object
 */
function adaptPublicRequest(controller) {
  // Decorate express object in this function
  return function (req, res, next) {
    const generatedHttp = generateHttpObject(req, res, next);
    // console.log(req.body);
    ExpressObject(generatedHttp)(controller);
  };
}

// Decoration of public adapter object
function adaptProtectedRequest(controller) {
  return function (req, res, next) {
    // console.log(req);
    protectionProxy(req)
      .then(() => {
        // res.send("hello world");
        //     // Decorate public adapter function and reuse it
        adaptPublicRequest(controller)(req, res, next);
      })
      .catch((err) => {
        const { status, msg } = err;
        res.status(status || 500).json(msg);
      });
  };
}

export { adaptPublicRequest as publicAdapter, adaptProtectedRequest as protectedAdapter };
