import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from 'middlewares/asyncHandler';
import Club from '../models/club';
import { body, validationResult } from 'express-validator';

const getAllClubs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const clubs = await Club.find({}).select('title description').exec();
  res.json(clubs);
});

const getClub = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const club = await Club.findById(req.params.id, '-password').populate('posts').exec();
  if (!club) {
    res.json({ error: 'Club not found' });
  }
  res.json(club);
});

const create_club = [
  body('title').trim().escape().isLength({ min: 5 }).withMessage('Title Should Be More than 5 characters long!'),
  body('description')
    .trim()
    .escape()
    .isLength({ min: 30 })
    .withMessage('Description Should Be More than 30 characters long!'),
  body('passwords').trim().isLength({ min: 8 }).withMessage('Passwords Should Be More than 8 characters long!'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errros: errors.array() });
    } else {
      const newClub = new Club({
        title: req.body.title,
        description: req.body.description,
        password: req.body.password
        // admin: req.user.id
      });

      await newClub
        .save()
        .then(() => res.status(200).end())
        .catch(() => res.status(400).send({ error: 'This Name already exists' }));
    }
  })
];

const update_club = [
  body('title').trim().escape().isLength({ min: 5 }).withMessage('Title Should Be More than 5 characters long!'),
  body('description')
    .trim()
    .escape()
    .isLength({ min: 30 })
    .withMessage('Description Should Be More than 30 characters long!'),
  body('passwords').trim().isLength({ min: 8 }).withMessage('Passwords Should Be More than 8 characters long!'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errros: errors.array() });
    } else {
      const club = new Club({
        title: req.body.title,
        description: req.body.description,
        password: req.body.password,
        _id: req.body.id
        // admin: req.user.id
      });

      await Club.findByIdAndUpdate(req.body.id, club, {}).exec();
    }
  })
];

const delete_club = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const club = await Club.findById(req.params.id).exec();
  if (!club) {
    const error = new Error('This Club does not exist');
    next(error);
  } else {
    await Club.findByIdAndDelete(req.params.id).exec();
  }
});

export { getAllClubs, getClub, create_club, update_club, delete_club };
