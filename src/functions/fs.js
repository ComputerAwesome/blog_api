import fs from 'fs';
import path from 'path';

export function deleteImageIfError(name) {
  try {
    fs.unlinkSync(path.join(__dirname, `../static/${name}`), function(err) {
      console.error(err);
    });
  } catch (err) {
    console.error(err);
  }
}
