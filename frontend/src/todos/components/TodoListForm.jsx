import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { createTodo } from '../utils/todoUtil'
import TodoItem from './TodoItem'

const AUTO_SAVE_DELAY_ms = 1000;

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const lastSavedTodos = useRef(todos);
  const saveTimeout = useRef(null); 

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  useEffect(() => {
    if (lastSavedTodos.current === todos) { //skips autosave if no changes too todoList
      return
    }
    lastSavedTodos.current = todos;

    if(saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      saveTodoList(todoList.id, { todos });
    }, AUTO_SAVE_DELAY_ms);

    return () => clearTimeout(saveTimeout.current);
  }, [todos, saveTodoList, todoList.id])

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <TodoItem
            key={index}
            todo={todo}
            index={index}
            todos={todos}
            setTodos={setTodos}
            />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, createTodo()])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
