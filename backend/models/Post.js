const mongoose = require("../db/conn"); //trocar para connection
const { Schema } = mongoose;

const Post = mongoose.model(
  "Post",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      color: {
        type: String,
      },
      images: {
        type: Array,
        required: true,
      },
      available: {
        type: Boolean,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true }
  )
);

module.exports = Post;
