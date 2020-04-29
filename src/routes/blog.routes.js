import {Router} from 'express';
import {protectedAdapter} from '../helpers/decorators';
import {addPost, getPosts, getOnePost} from '../controllers';
import {upload} from '../utils/multer';

const blog = Router();

blog.post('/addPost/:userId', upload.single('postImage'), protectedAdapter(addPost));

blog.get('/getPosts', protectedAdapter(getPosts));
blog.get('/getPosts/:postHash', protectedAdapter(getOnePost));

export default blog;
