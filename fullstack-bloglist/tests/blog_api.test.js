/* eslint-disable jest/expect-expect */
const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Möttösen Möttöset",
    author: "M. Möttönen",
    user: "61fdc3ca6540ebd4efcd31f9",
    url: "www.möttönenabcabc.org",
    likes: 99,
  },
  {
    title: "Fullstack 2021 testaus",
    author: "HY",
    user: "61fdc3ca6540ebd4efcd31f9",
    url: "www.helsinki.fi",
    likes: 25,
  },
];

describe("When initially added blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blog = new Blog(initialBlogs[0]);
    await blog.save();
    blog = new Blog(initialBlogs[1]);
    await blog.save();
  });

  test("get: blog in json", async () => {
    const response = await api.get("/api/blogs");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  test("get: amount of blogs in db", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(2);
  });

  test("get: blog identification is named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body.map((r) => r.id)).toBeDefined();
  });

  describe("Adding blogs", () => {
    test("post: blog is added to db", async () => {
      const newBlog = {
        title: "New Blog",
        author: "Me and myself",
        url: "www.newblogthingie.org",
        likes: 13,
      };

      await api.post("/api/blogs").send(newBlog).expect(201);

      const response = await api.get("/api/blogs").expect(200);

      expect(response.body).toHaveLength(initialBlogs.length + 1);
    });

    test("post: likes is 0 when not defined", async () => {
      const newBlog = {
        title: "New Blog",
        author: "Me and myself",
        url: "www.newblogthingie.org",
      };

      const posted = await api.post("/api/blogs").send(newBlog);

      expect(posted.body.likes).toBe(0);
    });

    test("post: returns 400 when no title defined", async () => {
      const newBlog = {
        url: "www.newblogthingie.org",
        author: "Testaaja",
        likes: 12,
      };

      const posted = await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("post: returns 400 when no url defined", async () => {
      const newBlog = {
        title: "Testing 123",
        author: "Testaaja",
        likes: 12,
      };

      const posted = await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
