import {Router} from 'express';
import {publicAdapter} from '../helpers/decorators';
import {signup, login} from '../controllers';
import {upload} from '../utils/multer';

const user = Router();

user.post('/signup', upload.single('profilePic'), publicAdapter(signup));

user.post('/login', publicAdapter(login));

export default user;
