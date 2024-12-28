import request from "supertest";
import appInit from "../server";
import mongoose from "mongoose";
import commentModel from "../models/comment";
import { Express } from "express";
import testCommentData from "./test_comment.json";

let app: Express;

type Comment = {
  _id?: string;
  content: string;
  senderId: string;
  postId: string;
};

const testComment: Comment[] = testCommentData;

beforeAll(async () => {
  console.log("beforeAll");
  app = await appInit();
  await commentModel.deleteMany();
});
afterAll(() => {
  console.log("afterAll");
  mongoose.connection.close();
});

describe("comments Test", () => {
  test("Test get all comments empty", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  test("Test create new comment", async () => {
    for (const comment of testComment) {
      const response = await request(app).post("/comments").send(comment);
      expect(response.statusCode).toBe(201);
      expect(response.body.content).toBe(comment.content);
      expect(response.body.senderId).toBe(comment.senderId);
      expect(response.body.postId).toBe(comment.postId);
      comment._id = response.body._id;
    }
  });
  test("Test get all comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testComment.length);
  });

  //   test("Test get comment by id", async () => {
  //     const response = await request(app).get("/comments/" + testComment[0]._id);
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body._id).toBe(testComment[0]._id);
  //   });
  test("Test get comment by postId", async () => {
    const response = await request(app).get(
      "/comments?postId=" + testComment[0].postId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("Test update comment", async () => {
    const response = await request(app)
      .put("/comments/" + testComment[0]._id)
      .send({ content: "Updated comment" });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated comment");
  });

  test("should return 404 if the comment to update does not exist", async () => {
    const nonExistentId = "641c8a4d0f0f1c3c12345678"; // ID תקין אבל לא קיים

    const response = await request(app)
      .put("/comments/" + nonExistentId)
      .send({ content: "Updated content" });

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("Comment not found");
  });

  test("should return 400 if the comment ID is invalid", async () => {
    const invalidId = "invalidId123";

    const response = await request(app)
      .put("/comments/" + invalidId)
      .send({ content: "Updated content" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("Test delete comment", async () => {
    const response = await request(app).delete(
      "/comments/" + testComment[0]._id
    );
    expect(response.statusCode).toBe(200);
    const responseGet = await request(app).get(
      "/comments" + testComment[0]._id
    );

    expect(responseGet.statusCode).toBe(404);
  });

  test("should return 404 if the comment to delete does not exist", async () => {
    const nonExistentId = "641c8a4d0f0f1c3c12345678";

    const response = await request(app).delete("/comments/" + nonExistentId);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("Comment not found");
  });

  test("Test create new comment fail", async () => {
    const response = await request(app).post("/comments").send({
      content: "This is a test comment",
      postId: "1234567890abcdef12345678",
    });
    expect(response.statusCode).toBe(400);
  });
});