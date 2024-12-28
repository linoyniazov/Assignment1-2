import request from "supertest";
import appInit from "../server";
import mongoose from "mongoose";
import postModel from "../models/post";

import testPostData from "./test_post.json";
import { Express } from "express";

let app: Express;

type Post = {
  _id?: string;
  content: string;
  senderId: string;
}

const testPost: Post[] = testPostData;

beforeAll(async () => {
  console.log("beforeAll");
    app = await appInit(); 
  await postModel.deleteMany();
});

afterAll(() => {
  console.log("afterAll");
  mongoose.connection.close();
});

describe("posts Test", () => {
  test("Test gel all post empty", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No posts found");
    // expect(response.body.length).toBe(0);
  });
  // test("Test create new post", async () => {
  //   for (let post of testPost) {
  //     const response = await request(app).post("/post").send(post);
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body.content).toBe(post.content);
  //     expect(response.body.senderId).toBe(post.senderId);
  //     post._id = response.body._id;
  //   }
  // });
  test("Test create new post", async () => {
    for (const post of testPost) {
      const response = await request(app).post("/posts").send(post);
      expect(response.statusCode).toBe(201);
      expect(response.body.content).toBe(post.content);
      expect(response.body.senderId).toBe(post.senderId);
      post._id = response.body._id;
    }
  });
  test("Test get all posts", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testPost.length);
  });
  test("Test get post by id", async () => {
    const response = await request(app).get("/post/" + testPost[0]._id);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testPost[0]._id);
  });
  test("Test get post by sender", async () => {
    const response = await request(app).get(
      "/post?sender=" + testPost[0].senderId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
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
        .put("/post/"+nonExistentId)
        .send({ content: "Updated content" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Post not found for update");
});


test("should return 400 when content is missing", async () => {
    const response = await request(app)
        .put("/post/"+testPost[0]._id)
        .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Field content is required");
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