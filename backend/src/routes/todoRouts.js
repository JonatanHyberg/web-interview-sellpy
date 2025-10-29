import express from 'express';
import { getAllLists, updateTodoList } from '../controllers/todoController.js';

const router = express.Router();

router.get('/lists', getAllLists);
router.put('/lists/:listId/todos', updateTodoList);

export default router;