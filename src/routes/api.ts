import { Router } from 'express';
import APIController from '../app/controllers/ApiController';
const router = Router();

// Due to Time issue i am just creating some mock apis
router.post('/cards/:idBoard', APIController.getCards);
router.post('/lists/:idBoard', APIController.getLists);
router.post('/members/:idBoard', APIController.getMembers);
router.post('/actions/:idBoard', APIController.getActions);
router.post('/labels/:idBoard', APIController.getLabels);
router.post('/boards', APIController.getBoards);
router.get('/boards/:idBoard', APIController.getBoardsWithAction)
router.get('/listOfboards/:idBoard', APIController.getListOfBoards)
router.get('/listOfboardsMembers/:idBoard', APIController.getListOfBoardsWithMembers)

export default router;
