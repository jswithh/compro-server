const mongoose = require('mongoose');
const faker = require('faker');
const Blog = require('../../src/models/blog.model');

const blogOne = {
  _id: new mongoose.Types.ObjectId(),
  author: faker.name.findName(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
  thumbnail: faker.image.imageUrl(),
};

const blogTwo = {
  _id: new mongoose.Types.ObjectId(),
  author: faker.name.findName(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
  thumbnail: faker.image.imageUrl(),
};

const insertBlogs = async (blogs) => {
  await Blog.insertMany(blogs);
};

module.exports = {
  blogOne,
  blogTwo,
  insertBlogs,
};
