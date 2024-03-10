import { Router } from 'express';
import * as userControllers from '../controllers/userController';
const router = Router();

// get all users
router.get('/', userControllers.getAllUsers);

// GET specified user
router.get('/:id', userControllers.getUser);

// POST new user
router.post('/', userControllers.create_user);

// DELETE specified user
router.delete('/:id', userControllers.delete_user);

// PUT 'UPDATE' user
router.put('/:id', userControllers.update_user);

export default router;
