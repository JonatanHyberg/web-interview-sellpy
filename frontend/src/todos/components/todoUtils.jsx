import { todoColors } from '../../theme/colors'

export const replaceTodoAtIndex = (todos, index, newTodo) => {
  const newList = [
    ...todos.slice(0,index),
    newTodo,
    ...todos.slice(index+1)
  ]
  return newList
}

export const getTodoOverdueColor = (todo) => {
  const isOverDue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  return isOverDue ? todoColors.late : todoColors.normal
}
