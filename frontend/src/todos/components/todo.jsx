const defaultTodoFields = {
  text: '',
  completed: false,
  dueDate: null,
};

export const createTodo = (input = {}) => ({
  ...defaultTodoFields,
  ...input,
});