import Post from '../models/post';
import { Request, Response, NextFunction } from 'express';

// Takes :id, :clubId to identify the post
const getAllPosts = (req: Request, res: Response, next: NextFunction) => {
  //
};

const getPost = (req: Request, res: Response, next: NextFunction) => {
  //
};

const create_post = (req: Request, res: Response, next: NextFunction) => {
  //
};

const update_post = (req: Request, res: Response, next: NextFunction) => {
  //
};

const delete_post = (req: Request, res: Response, next: NextFunction) => {
  //
};

export { getAllPosts, getPost, create_post, update_post, delete_post };
