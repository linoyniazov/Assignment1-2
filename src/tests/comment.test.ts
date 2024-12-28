import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comment";
import { Express } from "express";
import testComments from "./test_comment.json";
import userModel, { IUser } from "../models/user";

var app: Express;
type User = IUser & { token?: string };

const testUser: User = {
  email: "test@user.com",
  password: "password123",
};

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentsModel.deleteMany();

  await userModel.deleteMany();
  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.token;
  testUser._id = response.body._id;
  expect(testUser.token).toBeDefined();
});

afterAll((done) => {
  console.log("After all tests");
  mongoose.connection.close();
  done();
});

let commentId = "";
describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments/getcomments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  // test("Test Create Comment", async () => {
  //   const response = await request(app).post("/comments").send(testComments[0]);
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body.comment).toBe(testComments[0].comment);
  //   expect(response.body.postId).toBe(testComments[0].postId);
  //   // expect(response.body.owner).toBe(testComments[0].owner);
  //   commentId = response.body._id;
  // });

  test("Test Create comment", async () => {
    const response = await request(app)
      .post("/comments")
      .set({ authorization: "JWT " + testUser.token })
      .send(testComments[0]);
    expect(response.statusCode).toBe(201);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    commentId = response.body._id;
  });

  // test("Test get comment by owner", async () => {
  //   const response = await request(app).get("/comments?owner=" + testUser._id).set({ authorization: "JWT " + testUser.token });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.length).toBe(1);
  //   expect(response.body[0].comment).toBe(testComments[0].comment);
  //   expect(response.body[0].postId).toBe(testComments[0].postId);
  //   // expect(response.body[0].owner).toBe(testComments[0].owner);
  // });

  test("Test get comment by owner", async () => {
    const response = await request(app)
      .get("/comments?owner=" + testUser._id)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].comment).toBe(testComments[0].comment);
    expect(response.body[0].postId).toBe(testComments[0].postId);
  });

  test("Comments get post by id", async () => {
    const response = await request(app)
      .get("/comments/" + commentId)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    expect(response.body.owner).toBe(testComments[0].owner);
  });
});
