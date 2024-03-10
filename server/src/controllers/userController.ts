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

const create_user = [
  body('first_name').trim().escape().isLength({ min: 5 }).withMessage('First Name should be at least 5 characters'),
  body('last_name').trim().escape().isLength({ min: 5 }).withMessage('Last Name should be at least 5 characters'),
  body('username').trim().isLength({ min: 10 }).withMessage('Username should be at least 10 characters!'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ClientError('Missing fields');
    } else {
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
      });

      await newUser
        .save()
        .then(() => res.status(200).send('New user created successfully!'))
        .catch((err) => next(err));
    }
  })
];

const update_user = [
  body('first_name').trim().escape().isLength({ min: 5 }).withMessage('First Name should be at least 5 characters'),
  body('last_name').trim().escape().isLength({ min: 5 }).withMessage('Last Name should be at least 5 characters'),
  body('username').trim().isLength({ min: 10 }).withMessage('Username should be at least 10 characters!'),
  body('password').trim().isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ClientError('Missing fields');
    } else {
      const newUser = new User({
        _id: req.params.id, // to avoid create another _id
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
      });

      await User.findByIdAndUpdate(req.params.id, newUser, {})
        .then(() => res.status(200).send('User Update Successfully'))
        .catch((err) => next(err));
    }
  })
];

const delete_user = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError('There is no user with id ' + req.params.id);
  } else {
    await User.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).send('User Deleted Successfully'))
      .catch((err) => next(err));
  }
});

export { getAllUsers, getUser, create_user, delete_user, update_user };
