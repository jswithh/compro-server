/* eslint-disable no-console */
const request = require('supertest');
const faker = require('faker');
const path = require('path');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Blog } = require('../../src/models');
const { insertUsers, admin } = require('../fixtures/user.fixture');
const { adminAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Blogs API', () => {
  describe('POST /v1/blogs', () => {
    test('should return 201 and create a new blog', async () => {
      await insertUsers([admin]);
      const res = await request(app)
        .post('/v1/blogs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .attach('thumbnail', path.join(__dirname, '../fixtures/thumbnail.jpg'))
        .field('title', faker.lorem.words(3))
        .field('content', faker.lorem.paragraphs(3));

      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body).toHaveProperty('author');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('content');
      expect(res.body).toHaveProperty('thumbnail');

      const dbBlog = await Blog.findById(res.body.id);
      expect(dbBlog).toBeDefined();
      expect(dbBlog).toMatchObject({
        author: admin.name,
        title: res.body.title,
        content: res.body.content,
        thumbnail: res.body.thumbnail,
      });
    });

    test('should return 401 error when access token is missing', async () => {
      const res = await request(app).post('/v1/blogs');
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error when title is missing', async () => {
      await insertUsers([admin]);
      const res = await request(app)
        .post('/v1/blogs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .attach('thumbnail', path.join(__dirname, '../fixtures/thumbnail.jpg'))
        .field('content', faker.lorem.paragraphs(3));
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error when content is missing', async () => {
      await insertUsers([admin]);
      const res = await request(app)
        .post('/v1/blogs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .attach('thumbnail', path.join(__dirname, '../fixtures/thumbnail.jpg'))
        .field('title', faker.lorem.words(3));
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error when thumbnail is missing', async () => {
      await insertUsers([admin]);
      const res = await request(app)
        .post('/v1/blogs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .field('title', faker.lorem.words(3))
        .field('content', faker.lorem.paragraphs(3));

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  // Add more describe blocks to cover GET, PATCH, and DELETE endpoints
});
