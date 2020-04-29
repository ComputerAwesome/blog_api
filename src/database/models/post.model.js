import {Schema, model} from 'mongoose';
import autoPopulate from 'mongoose-autopopulate';

const postSchema = new Schema({
  createdIn: {
    type: Date,
    required: true,
  },
  updatedIn: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    autopopulate: true,
  },
  postTitle: {
    type: String,
    required: true,
    trim: true,
  },
  postImage: {
    type: String,
    required: true,
    trim: true,
  },
  post: {
    type: String,
    required: true,
    trim: true,
  },
  postHash: {
    type: String,
    required: true,
    trim: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
}).plugin(autoPopulate);

export default model('post', postSchema);
