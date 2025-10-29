import React, { useState, useEffect, useRef } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { todoColors } from '../../theme/colors'


const AUTO_SAVE_DELAY_ms = 1000;

const replaceTodoAtIndex = (todos, index, newTodo) => {
  const newList = [
    ...todos.slice(0,index),
    newTodo,
    ...todos.slice(index+1)
  ]
  return newList
}

const isTodoOverdue = (todo) => {
    return !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
}

const createEmptyTodo = (overrides = {}) => ({
  text: '',
  completed: false,
  dueDate: null,
  ...overrides,
});

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const saveTimeout = useRef(null); 


  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  //automatic save function
  useEffect(() => {
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
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: "0.5rem", 
              marginBottom: "1rem", 
              }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox 
                type='checkbox'
                name='checkingBox'
                checked={todo.completed}
                sx={{
                  '&.Mui-checked': {
                    color: todoColors.completed,
                  },
                }}
                onChange={event => {
                  setTodos(replaceTodoAtIndex(todos, index, {...todo, completed:event.target.checked}))
                }}
              />
              <TextField
                sx={{ flexGrow: 1,}}
                label='What to do?'
                value={todo.text}
                onChange={(event) => {
                  setTodos(replaceTodoAtIndex(todos, index, {...todo, text:event.target.value}))
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label = "Due Date"
                    value = {todo.dueDate ? new Date(todo.dueDate) : null}
                    onChange = {newDate =>
                      setTodos(replaceTodoAtIndex(todos, index, {...todo, dueDate:newDate}))
                    }
                    renderInput={(params) => (<TextField {...params} 
                      sx={{
                        "& .MuiInputBase-input": {
                          color: isTodoOverdue(todo) ? todoColors.late : todoColors.normal, // text color
                        },
                        "& .MuiInputLabel-root": {
                          color: isTodoOverdue(todo) ? todoColors.late : todoColors.normal, // label color
                        },
                      }}
                    />)
                    }
                  />
              </LocalizationProvider>
              
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
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
              onClick={() => {
                setTodos([...todos, createEmptyTodo()])
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
