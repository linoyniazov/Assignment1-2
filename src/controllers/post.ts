import postModel from "../models/post";
import { Request, Response } from "express";
import BaseController from "./base_controller";

const postsController = new BaseController(postModel);

export default postsController;
// import Post from '../models/post';
// import { Request, Response } from 'express';
// /**
//  * Add a new post
//  */
// const addPost = async (req:Request, res:Response) => {
//     try {
//         const { content, senderId } = req.body;

//         if (!content || !senderId) {
//             return res.status(400).json({ message: 'Fields content and senderId are required' });
//         }

//         const newPost = new Post({
//             content,
//             senderId,
//         });

//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (err) {
//         res.status(500).send(err);
        
//     }
// };


// /**
//  * Get all posts or posts by sender
//  */
// const getAllPosts = async (req:Request, res:Response) => {
//     try {
//         const { sender } = req.query;

//         let posts;
//         if (sender) {
//             posts = await Post.find({ senderId: sender }); // Filter by sender
//         } else {
//             posts = await Post.find(); // Get all posts
//         }

//         if (!posts || posts.length === 0) {
//             return res.status(404).json({ message: 'No posts found' });
//         }

//         res.status(200).json(posts);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// /**
//  * Get a post by ID
//  */
// const getPostById = async (req:Request, res:Response) => {
//     try {
//         const { id } = req.params;

//         const post = await Post.findById(id);

//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.status(200).json(post);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// /**
//  * Update a post by ID
//  */
// const updatePost = async (req:Request, res:Response) => {
//     try {
//         const { id } = req.params;
//         const { content } = req.body;

//         if (!id) {
//             return res.status(400).json({ message: 'Post ID is required' });
//         }

//         if (!content) {
//             return res.status(400).json({ message: 'Field content is required' });
//         }

//         const updatedPost = await Post.findByIdAndUpdate(
//             id,
//             { content },
//             { new: true } // Return updated document
//         );

//         if (!updatedPost) {
//             return res.status(404).json({ message: 'Post not found for update' });
//         }

//         res.status(200).json(updatedPost);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };


// export default {
//     getAllPosts,
//     addPost,
//     getPostById,
//     updatePost,
// };