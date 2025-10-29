export const defaultTodoFields = {
  text: '',
  completed: false,
  dueDate: null,
};

export const createTodo = (input = {}) => ({
  ...defaultTodoFields,
  ...input,
});

export const normalizeTodoList = (todoList) => {
  if (!Array.isArray(todoList)) {
    throw new Error('Received todoList not in an array');
  }
  return todoList.map((todo) => createTodo(todo));
};