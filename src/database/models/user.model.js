import { Schema, model } from "mongoose";
import autoPopulate from "mongoose-autopopulate";

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  profilePic: {
    type: String,
    trim: true,
    required: false
  }
}).plugin(autoPopulate);

export default model("user", userSchema);
