export const defaultTodoFields = {
  text: '',
  completed: false,
  dueDate: null,
}

export const createTodo = (input = {}) => {
  const allowedFields = Object.keys(defaultTodoFields)
  const filteredInput = Object.fromEntries(
    Object.entries(input).filter(([key]) => allowedFields.includes(key)),
  )

  return {
    ...defaultTodoFields,
    ...filteredInput,
  }
}

export const normalizeTodoList = (todoList) => {
  if (!Array.isArray(todoList)) {
    throw new Error('Received todoList not in an array')
  }
  return todoList.map((todo) => createTodo(todo))
}
