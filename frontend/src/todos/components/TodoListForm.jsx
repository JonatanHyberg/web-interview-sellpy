import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import { green } from '@mui/material/colors'
import { useEffect, useRef } from 'react'

const replaceTodoAtIndex = (todos,index, newTodo) => {
  const newList = [
    ...todos.slice(0,index),
    newTodo,
    ...todos.slice(index+1)
  ]
  return newList
}

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const saveTimeout = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  useEffect(() => {
    if(saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      console.log("Autosaving...");
      saveTodoList(todoList.id, { todos });
    }, 1000);

    return () => clearTimeout(saveTimeout.current);
  },[todos])

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>

              <Checkbox
                type='checkbox'
                name='checkingBox'
                checked={todo.completed}
                sx={{
                  '&.Mui-checked': {
                    color: green[500],
                  },
                }}
                onChange={event => {
                  setTodos(replaceTodoAtIndex(todos, index, {...todo, completed:event.target.checked}))
                  //handleSubmit(event)
                }}
              />
            
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => {
                  setTodos(replaceTodoAtIndex(todos, index, {...todo, text:event.target.value}))
                  //handleSubmit(event)
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={(event) => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                  //handleSubmit(event)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={(event) => {
                setTodos([...todos, {text:'', completed:false}])
                //handleSubmit(event)
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
