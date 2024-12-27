import request from "supertest";
import appInit from "../server";
import mongoose from "mongoose";
import postModel from "../models/post";
import { Express } from "express";

// import testPost from "./test_post";
let app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await appInit();
  await postModel.deleteMany();
});

afterAll(() => {
  console.log("afterAll");
  mongoose.connection.close();
});

let postId = "";
const testPost = {
  content: "This is a test post",
  senderId: "12345",
};

const invalidPost = {
  content: "This is a test post",
};

describe("posts Test", () => {
  test("Test gel all post empty", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No posts found");
    // expect(response.body.length).toBe(0);
  });
  test("create new post", async () => {
    const response = await request(app).post("/posts").send(testPost);
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.sender).toBe(testPost.senderId);
    postId = response.body._id;
  });
  test("Test get all posts", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  test("Test get post by id", async () => {
    const response = await request(app).get("/post/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(postId);
  });

  test("Test get post by sender", async () => {
    const response = await request(app).get(
      "/posts?sender=" + testPost.senderId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].sender).toBe(testPost.senderId);
  });

  test("Test update post", async () => {
    const response = await request(app)
      .put("/post/" + testPost[0]._id)
      .send({ content: "Updated content" });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated content");
  });

  test("should return 404 when post ID does not exist", async () => {
    const nonExistentId = "641c8a4d0f0f1c3c12345678"; // ID תקין אבל לא קיים

    const response = await request(app)
      .put("/post/" + nonExistentId)
      .send({ content: "Updated content" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Post not found for update");
  });

  // test("should return 400 when content is missing", async () => {
  //   const response = await request(app)
  //     .put("/post/" + testPost[0]._id)
  //     .send({});

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.message).toBe("Field content is required");
  // });
  test("Add invalid post", async () => {
    const response = await request(app).post("/post").send(invalidPost);
    expect(response.statusCode).not.toBe(200);
  });
  test("Test create new post fail", async () => {
    const response = await request(app).post("/post").send({
      content: "This is a test post",
    });
    expect(response.statusCode).toBe(400);
  });
  //   test("Test get post by id fail - invalid ID format", async () => {
  //     const response = await request(app).get("/post/invalidId");
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body.message).toBe("Invalid post ID");
  //   });
  test("Fail to get post by non-existing ID", async () => {
    const response = await request(app).get("/post/675d74c7e039287983e32a15");
    expect(response.statusCode).toBe(404);
  });
});
