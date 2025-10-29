import { todoLists } from '../database/data.js'
import { normalizeTodoList } from '../models/todoModel.js'

export const getAllLists = (req, res) => {
  res.json(todoLists)
}

export const updateTodoList = (req, res) => {
  const { listId } = req.params
  const todos = req.body

  if (!todoLists[listId]) {
    return res.status(404).json({ error: 'List not found' })
  }

  try {
    const normalizedTodoList = normalizeTodoList(todos)
    todoLists[listId].todos = normalizedTodoList

    res.status(200).json({
      success: true,
      list: todoLists[listId],
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to write to database' })
  }
}
