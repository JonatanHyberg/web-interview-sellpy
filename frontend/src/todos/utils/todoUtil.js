import { todoColors } from '../../theme/colors'

const defaultTodoFields = {
  text: '',
  completed: false,
  dueDate: null,
}

export const createTodo = (input = {}) => ({
  ...defaultTodoFields,
  ...input,
})

export const replaceTodoAtIndex = (todos, index, newTodo) => {
  const newList = [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)]
  return newList
}

export const getTodoOverdueColor = (todo) => {
  const isOverDue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  return isOverDue ? todoColors.late : todoColors.normal
}

export const getTodoListStatusColor = (todos) => {
  const completedList = todos.length > 0 && todos.every((todo) => todo.completed)
  return completedList ? todoColors.completed : todoColors.late
}
