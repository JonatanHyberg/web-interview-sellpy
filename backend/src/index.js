import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let todos = {
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: ['First todo of first list!'],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: ['First todo of second list!'],
      },
    };

app.get('/', (req, res) => res.send('Hello World!'))

//fetch todo list
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/message', (req, res) => {
    console.log(req.body.text)
    const newTodo = {id: todos.length() + 1, title: "second Todo list", todo: []};
    todos.push(newTodo)
    res.status(201).json(newTodo)
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
