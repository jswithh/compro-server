const mongoose = require('mongoose');
const { toJSON, paginate, slugify } = require('./plugins');

const blogSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
      default() {
        return slugify(this.title);
      },
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

blogSchema.statics.isTitleTaken = async function (title, excludeBlogId) {
  const blog = await this.findOne({ title, _id: { $ne: excludeBlogId } });
  return !!blog;
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
