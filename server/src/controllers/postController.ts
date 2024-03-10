import { asyncHandler } from 'middlewares/asyncHandler';
import Post from '../models/post';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ClientError, NotFoundError } from 'exceptions';

// Takes :id, :clubId to identify the post
const getAllPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const posts = await Post.find({ club: req.params.clubid })
    .populate({ path: 'club', select: 'title' })
    .populate({ path: 'author', select: 'username fullName photo' })
    .exec();
  res.json(posts);
});

const getPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new NotFoundError('This Post is not available');
  } else {
    res.status(200).json(post);
  }
});

const createPost = [
  body('title')
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage('The post tile should be at least 10 characters long'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ClientError(
        errors
          .array()
          .map((err) => err.msg)
          .join(', ')
      );
    } else {
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        club: req.params.clubId
        //author: req.user.id
      });

      try {
        await newPost.save();
        res.status(200).json({ success: true, message: 'Post Created Successfully' });
      } catch (err) {
        next(err);
      }
    }
  })
];

const updatePost = [
  body('title')
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage('The post tile should be at least 10 characters long'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ClientError(
        errors
          .array()
          .map((err) => err.msg)
          .join(', ')
      );
    } else {
      const newPost = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        club: req.params.clubId
        //author: req.user.id
      });

      try {
        await Post.findByIdAndUpdate(req.body.id, newPost, {});
        res.status(200).json({ success: true, message: 'Post Created Successfully' });
      } catch (err) {
        next(err);
      }
    }
  })
];

const deletePost = asyncHandler(async (req: Request, res: Response, next: NextHandler) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new NotFoundError('This Post does not exist');
  } else {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Post Deleteed Successfully' });
    } catch (err) {
      next(err);
    }
  }
});

export { getAllPosts, getPost, createPost, updatePost, deletePost };
