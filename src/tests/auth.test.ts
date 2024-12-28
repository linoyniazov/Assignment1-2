import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/post";
import { Express } from "express";
import userModel, { IUser } from "../models/user";

var app: Express;
beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await userModel.deleteMany();
  await postModel.deleteMany();
});
afterAll((done) => {
  console.log("After all tests");
  mongoose.connection.close();
  done();
});
const baseUrl = "/auth";
type User = IUser & { token?: string };

const testUser: User = {
  email: "test@user.com",
  password: "password123",
};
describe("Auth Tests", () => {
  test("Auth test register", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).toBe(200);
  });
  test("Auth test register fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).not.toBe(200);
  });

  test("Auth test register fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send({
        email: "sdsdfsd",
      });
    expect(response.statusCode).not.toBe(200);
    const response2 = await request(app)
    .post(baseUrl + "/register")
    .send({
      email: "",
      passworsd: "sdfsdf",
    });
  expect(response2.statusCode).not.toBe(200);
  });

  test("Auth test login", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    const token = response.body.token;
    expect(token).toBeDefined();
    expect(response.body._id).toBeDefined();
    testUser.token = token;
    testUser._id = response.body._id;
  });

  test("Auth test login fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: testUser.email,
        password: "wrongpassword",
      });
    expect(response.statusCode).not.toBe(200);

    const response2 = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: "wrongemail",
        password: "wrongpassword",
      });
    expect(response2.statusCode).not.toBe(200);
   
  });

  test("Auth test me", async () => {
    const response = await request(app).post("/post").send({
      title: "Test Post",
      content: "Test Content",
      owner: "sdfSd",
    });
    expect(response.statusCode).not.toBe(201);
    const response2 = await request(app)
      .post("/post")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        title: "Test Post",
        content: "Test Content",
        owner: "sdfSd",
      });
    expect(response2.statusCode).toBe(201);
  });
});
