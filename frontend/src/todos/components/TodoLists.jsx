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




const fetchTodoLists = async () => {
  try {
    const res = await fetch("/api/todos")

    if (!res.ok) {
      console.error("Server returned error code: ", res.status);
      alert(`Error code: ${res.status}`)
      return {};
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error code: ", error)
    alert(`Error code: ${error}`)
    return {}
  }

}


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

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const saveTodoList = useCallback(async (id, { todos }) => {
    const successful_save = await sendTodoList(id, { todos })

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
          saveTodoList= {saveTodoList}
        />
      )}
    </Fragment>
  )
}
