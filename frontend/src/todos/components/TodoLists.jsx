import React, { Fragment, useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { todoColors } from '../../theme/colors'
import { fetchTodoLists, updateTodosList } from './todosApi'


const getTodoListStatusColor = (todos) => {
  const completedList = todos.length > 0 && todos.every(todo => todo.completed);
  return completedList ? todoColors.completed : todoColors.late;
}


export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])


  const saveTodoList = useCallback(async (id, { todos }) => {
    const successful_save = await updateTodosList(id, todos);
    
    if (!successful_save) {
      alert("Failed to save your todos. Please try again!")
      return
    }

    setTodoLists(prevLists => ({
      ...prevLists,
      [id]: { ...prevLists[id], todos },
    }))
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={todoLists[key].title}
                  sx = {{color: getTodoListStatusColor(todoLists[key].todos)}}
                />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList= {saveTodoList} 
        />
      )}
    </Fragment>
  )
}
