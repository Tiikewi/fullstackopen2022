/* eslint-disable jest/expect-expect */
const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initialUsers = [
  {
    username: "testaaja",
    name: "T. Testinen",
    password: "salasana1",
  },
  {
    username: "paras_testaaja",
    name: "P. Paras",
    password: "salasanaVaikea",
  },
];

describe("When initially two users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    let user = new User(initialUsers[0]);
    await user.save();
    user = new User(initialUsers[1]);
    await user.save();
  });

  test("GET: user in json", async () => {
    const res = await api.get("/api/users");

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("GET: amount of users in db", async () => {
    const res = await api.get("/api/users");

    expect(res.body).toHaveLength(2);
  });

  describe("Adding users", () => {
    test("POST: user added to db", async () => {
      const newUser = {
        username: "lisaaja",
        name: "L. Lisaaja",
        password: "muistettavaSalasana",
      };

      await api.post("/api/users").send(newUser).expect(201);
      const res = await api.get("/api/users").expect(200);
      expect(res.body).toHaveLength(initialUsers.length + 1);
    });

    test("POST:error when not unique username", async () => {
      newUser = {
        username: "testaaja",
        name: "T. Testinen",
        password: "salasana1",
      };

      await api.post("/api/users/").send(newUser).expect(400);
    });

    test("POST: error when no password", async () => {
      newUser = {
        username: "testaaja123",
        name: "T. Testinen",
      };

      await api.post("/api/users/").send(newUser).expect(400);
    });

    test("POST: error when too short password", async () => {
      newUser = {
        username: "testaaja22222",
        name: "T. Testinen",
        password: "01",
      };

      await api.post("/api/users/").send(newUser).expect(400);
    });
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});
