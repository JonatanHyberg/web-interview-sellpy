import React, { Fragment, useState, useEffect } from 'react'
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


//Update to fetch from server
const fetchTodoLists = async () => {
    return fetch("/api/todos")
      .then(res => res.json())
      .catch(err => console.error("Error fetching", err))
}


export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])


  const sendTodoList = async (id, {todos}) => {
    const update = {'id': id, 'todos': todos}

    try {
      const res = await fetch("/api/todos", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(update),
    })

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json()
    console.log(data)
    
    return true

    } catch (error) {
      console.error("Failed to save todos: ", error)
      return false
    }

}

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
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList= {async (id, { todos }) => {
          const sucessful_save = await sendTodoList(id, {todos})

          if(!sucessful_save) {
            alert("Failed to save your todos. Please try again!");
            return;
          } 

          const listToUpdate = todoLists[id]
          setTodoLists({
            ...todoLists,
            [id]: { ...listToUpdate, todos },
          })

          }}
        />
      )}
    </Fragment>
  )
}
