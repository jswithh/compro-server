const faker = require('faker');
const { Blog } = require('../../../src/models');

describe('Blog model', () => {
  describe('Blog validation', () => {
    let newBlog;
    beforeEach(() => {
      newBlog = {
        title: faker.name.findName(),
        author: faker.name.findName(),
        content: faker.lorem.paragraph(),
        thumbnail: faker.image.imageUrl(),
      };
    });
    test('should correctly validate a valid blog', async () => {
      await expect(new Blog(newBlog).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if title is invalid', async () => {
      newBlog.title = '';
      await expect(new Blog(newBlog).validate()).rejects.toThrow();
    });

    test('should throw a validation error if author is invalid', async () => {
      newBlog.author = '';
      await expect(new Blog(newBlog).validate()).rejects.toThrow();
    });

    test('should throw a validation error if content is invalid', async () => {
      newBlog.content = '';
      await expect(new Blog(newBlog).validate()).rejects.toThrow();
    });

    test('should throw a validation error if thumbnail is invalid', async () => {
      newBlog.thumbnail = '';
      await expect(new Blog(newBlog).validate()).rejects.toThrow();
    });
  });
});
