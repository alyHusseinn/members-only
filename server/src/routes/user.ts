import { Router } from 'express';

const router = Router();

// get all users
router.get('/');

// GET specified user
router.get('/:id');

// POST new user
router.post('/');

// DELETE specified user
router.delete('/:id');

// PUT 'UPDATE' user
router.put('/:id');

export default router;
