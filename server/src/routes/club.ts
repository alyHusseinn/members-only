/**
 * our club//
 * get clubs
 * get club
 * create club
 * update club
 * delete club
 */

import { Router } from 'express';
import * as clubControllers from '../controllers/clubController';

const router = Router();

// get all clubs
router.get('/', clubControllers.getAllClubs);

// GET specified club
router.get('/:id', clubControllers.getClub);

// POST new club
router.post('/', clubControllers.create_club);

// DELETE specified club
router.delete('/:id', clubControllers.delete_club);

// PUT 'UPDATE' club
router.put('/:id', clubControllers.update_club);

export default router;
