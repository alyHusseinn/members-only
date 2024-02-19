import { Router } from 'express';

const router = Router();

// get all posts
router.get('/');

// GET specified post
router.get('/:id');

// POST new post
router.post('/');

// DELETE specified post
router.delete('/:id');

// PUT 'UPDATE' post
router.put('/:id');

export default router;
