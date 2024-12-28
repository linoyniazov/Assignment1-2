import request from "supertest";
import appInit from "../server";
import mongoose from "mongoose";
import postModel from "../models/post";

import testPostData from "./test_post.json";
import { Express } from "express";

import userModel, { IUser } from "../models/user";

var app: Express;
type User = IUser & { token?: string };

const testUser: User = {
  email: "test@user.com",
  password: "password123",
};

beforeAll(async () => {
  console.log("beforeAll");
  app = await appInit();
  await postModel.deleteMany();

  await userModel.deleteMany();
  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.token;
  testUser._id = response.body._id;
  expect(testUser.token).toBeDefined();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let postId = "";

describe("Posts Tests", () => {
  test("Posts test get all", async () => {
    const response = await request(app).get("/post/getposts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  test("Test Create post", async () => {
    const response = await request(app)
      .post("/post")
      .set({ authorization: "JWT " + testUser.token })
      .send(testPostData[0]);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(testPostData[0].title);
    expect(response.body.content).toBe(testPostData[0].content);
    postId = response.body._id;
  });

  test("Test Create post 2", async () => {
    const response = await request(app)
      .post("/post")
      .set({ authorization: "JWT " + testUser.token })
      .send(testPostData[1]);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(testPostData[1].title);
    expect(response.body.content).toBe(testPostData[1].content);
    postId = response.body._id;
  });

  test("Test get post by owner", async () => {
    const response = await request(app)
      .get("/post?owner=" + testUser._id)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe(testPostData[0].title);
    expect(response.body[0].content).toBe(testPostData[0].content);
  });

  test("Test get post by id", async () => {
    const response = await request(app).get("/post/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(testPostData[1].content);
    expect(response.body.title).toBe(testPostData[1].title);
  });

  test("Posts test get all 2", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe(testPostData[0].title);
    expect(response.body[1].title).toBe(testPostData[1].title); 
  });

  test("Test Delete post", async () => {
    const response = await request(app)
      .delete("/post/" + postId)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);

    const response2 = await request(app).get("/post/" + postId);
    // .set({ authorization: "JWT " + testUser.token });
    expect(response2.statusCode).toBe(404);
  });

  test("Test Create Post fail", async () => {
    const response = await request(app)
      .post("/post")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        content: "Test Content 2",
      });
    expect(response.statusCode).toBe(400); // Assuming the creation fails due to missing title or other validation
  });
});
