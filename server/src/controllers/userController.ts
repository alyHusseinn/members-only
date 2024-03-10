import { NextFunction, Response, Request } from 'express';
import User from '../models/user';
import { asyncHandler } from 'middlewares/asyncHandler';
import { ClientError, NotFoundError } from 'exceptions';
import { body, validationResult } from 'express-validator';

const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find({});
  res.json(users);
});

const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id, '-password').exec();
  if (!user) {
    throw new NotFoundError("There's no user with id " + req.params.id);
  } else {
    res.json(user);
  }
});

const createUser = [
  body('first_name').trim().escape().isLength({ min: 5 }).withMessage('First Name should be at least 5 characters'),
  body('last_name').trim().escape().isLength({ min: 5 }).withMessage('Last Name should be at least 5 characters'),
  body('username').trim().isLength({ min: 10 }).withMessage('Username should be at least 10 characters!'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ClientError(
        errors
          .array()
          .map((err) => err.msg)
          .join(', ')
      );
    }

    const { first_name, last_name, username, password } = req.body;

    try {
      const newUser = new User({ first_name, last_name, username, password });
      await newUser.save();
      res.status(201).json({ sucess: true, message: 'New user created successfully', user: newUser });
    } catch (error) {
      next(error);
    }
  })
];

const updateUser = [
  body('first_name').trim().escape().isLength({ min: 5 }).withMessage('First Name should be at least 5 characters'),
  body('last_name').trim().escape().isLength({ min: 5 }).withMessage('Last Name should be at least 5 characters'),
  body('username').trim().isLength({ min: 10 }).withMessage('Username should be at least 10 characters!'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),

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
      const { first_name, last_name, username, password, id } = req.body;
      const newUser = new User({ _id: id, username, first_name, last_name, password });

      try {
        await User.findByIdAndUpdate(req.params.id, newUser, {});
        res.status(200).json({ success: true, message: 'User updated successfully', user: newUser });
      } catch (err) {
        next(err);
      }
    }
  })
];

const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError('There is no user with id ' + req.params.id);
  } else {
    await User.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).send('User Deleted Successfully'))
      .catch((err) => next(err));
  }
});

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
