const httpStatus = require('http-status');
const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a blog
 * @param {Object} blogBody
 * @returns {Promise<Blog>}
 */
const createBlog = async (blogBody, userId) => {
  if (await Blog.isTitleTaken(blogBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  const newBlogBody = { ...blogBody, author: userId };
  return Blog.create(newBlogBody);
};

/**
 * Query for blogs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBlogs = async (filter, options) => {
  const blogs = await Blog.paginate(options);
  return blogs;
};

/**
 * Get blog by slug
 * @param {string} slug
 * @returns {Promise<Blog>}
 */
const getBlogBySlug = async (slug) => {
  return Blog.findOne({ slug });
};

/**
 * Update blog by id
 * @param {ObjectId} blogId
 * @param {Object} updateBody
 * @returns {Promise<Blog>}
 */
const updateBlogBySlug = async (blogSlug, updateBody) => {
  const blog = await getBlogBySlug(blogSlug);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  Object.assign(blog, updateBody);
  await blog.save();
  return blog;
};

/**
 * Delete blog by id
 * @param {ObjectId} blogId
 * @returns {Promise<Blog>}
 */
const deleteBlogBySlug = async (blogSlug) => {
  const blog = await updateBlogBySlug(blogSlug);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  await blog.deleteOne();
  return blog;
};

module.exports = {
  createBlog,
  queryBlogs,
  getBlogBySlug,
  deleteBlogBySlug,
};
