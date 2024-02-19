import { Router } from 'express';
import * as postControllers from '../controllers/post';

const router = Router();

// get all posts
router.get('/:clubid', postControllers.getAllPosts);

// GET specified post
router.get('/:clubid/:id', postControllers.getPost);

// POST new post
router.post('/:clubid', postControllers.create_post);

// DELETE specified post
router.delete('/:clubid/:id', postControllers.delete_post);

// PUT 'UPDATE' post
router.put('/:clubid/:id', postControllers.update_post);

export default router;
