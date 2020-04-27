import multer from "multer";
import { hash as createHash } from "../security/crypto";
import { join } from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../static"));
  },
  filename: function (req, file, cb) {
    let pureImage = file.originalname.split(".");

    let path = pureImage[pureImage.length - 1];

    let hashImageName = createHash(`${Date.now()}${Date.now()}.${path}`);

    cb(null, `${hashImageName}.${path}`);
  },
});

export const upload = multer({ storage });
