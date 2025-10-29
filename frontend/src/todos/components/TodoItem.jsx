import React from 'react'
import { TextField,  Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { todoColors } from '../../theme/colors'
import { getTodoOverdueColor, replaceTodoAtIndex  } from '../utils/todoUtil'

export default function TodoItem({ 
  todo, 
  index, 
  todos, 
  setTodos, 
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      <Typography sx={{ margin: '8px' }} variant="h6">
        {index + 1}
      </Typography>

      <Checkbox
        checked={todo.completed}
        sx={{
          '&.Mui-checked': { color: todoColors.completed },
        }}
        onChange={(event) => {
          setTodos(
            replaceTodoAtIndex(todos, index, {
              ...todo,
              completed: event.target.checked,
            })
          );
        }}
      />
      <TextField
        sx={{ flexGrow: 1 }}
        label="What to do?"
        value={todo.text}
        onChange={(event) => {
          setTodos(
            replaceTodoAtIndex(todos, index, {
              ...todo,
              text: event.target.value,
            })
          );
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Due Date"
          value={todo.dueDate ? new Date(todo.dueDate) : null}
          onChange={(newDate) => {
            setTodos(
              replaceTodoAtIndex(todos, index, {
                ...todo,
                dueDate: newDate,
              })
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& .MuiInputBase-input': {
                  color: getTodoOverdueColor(todo),
                },
                '& .MuiInputLabel-root': {
                  color: getTodoOverdueColor(todo),
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <Button
        sx={{ margin: '8px' }}
        size="small"
        color="secondary"
        onClick={() => {
          setTodos([
            ...todos.slice(0, index),
            ...todos.slice(index + 1),
          ]);
        }}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
}