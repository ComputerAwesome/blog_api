export const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/blog";

export const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
