import { Router } from 'express';
import APIController from '../app/controllers/ApiController';
const router = Router();

router.post('/cards/:id', APIController.getCards);
router.post('/lists/:id', APIController.getLists);
router.post('/members/:id', APIController.getMembers);
router.post('/actions/:id', APIController.getActions);
router.post('/labels/:id', APIController.getLabels);
router.post('/boards', APIController.getBoards);

export default router;
