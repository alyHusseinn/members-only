/**
 * our club//
 * get clubs
 * get club
 * create club
 * update club
 * delete club
 */

import { Router } from 'express';

const router = Router();

// get all clubs
router.get('/');

// GET specified club
router.get('/:id');

// POST new club
router.post('/');

// DELETE specified club
router.delete('/:id');

// PUT 'UPDATE' club
router.put('/:id');

router.use('/clubs');

export default router;
