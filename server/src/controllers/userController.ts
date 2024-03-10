import { NextFunction, Response, Request } from 'express';
import User from '../models/user';
import { asyncHandler } from 'middlewares/asyncHandler';

// get all users
// get user:id
// post user
// update user:id
// delete user:id

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find({});
  res.json(users);
};

const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // const user = await User.findById(req.params.id);
  // if (!user) {
  //   next(new Error('This user does not exist'));
  // }else {

  // }
});

const create_user = async (req: Request, res: Response, next: NextFunction) => {
  // check if that userName exist Return with invalid userName
  // if not, create a new user
  //   const user = await User.find({ username: req.body.userName });
  //   if (user) {
  //   } else {
  //     await User.create({
  //         first_name: req.body.firstName,
  //         last_name: req.body.lastName,
  //         username: req.body.username,
  //     });
  //   }
};

const delete_user = (req: Request, res: Response, next: NextFunction) => {
  //
};

const update_user = (req: Request, res: Response, next: NextFunction) => {
  //
};

export { getAllUsers, getUser, create_user, delete_user, update_user };
