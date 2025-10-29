import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

const defaultTodoFields = {
  text: '',
  completed: false,
  dueDate: null,
};

const createTodo = (input = {}) => ({
  ...defaultTodoFields,
  ...input,
});

const normalizeTodoList = (todoList) => {
    if (!Array.isArray(todoList)) {
        throw new Error("Recived todoList not in an array");
    }
    return todoList.map((todo) => createTodo(todo))
}

let todoLists = {
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [{text: 'First todo of first list!', completed: true, dueDate: null}],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [{text:'First todo of second list!', completed: false, dueDate: null}],
      },
    };

app.get('/', (request, result) => result.send('Hello World!'))


app.get('/api/todos', (request, result) => {
    result.json(todoLists);
});


app.post('/api/todos', (request, result) => {
    const {id, todos} = request.body;

    console.log(todos)

    if (!todoLists[id]) {
        return result.status(404).json({ error: "List not found" });
    }
    
    try {
        const normalizedTodoList = normalizeTodoList(todos);
        todoLists[id].todos = normalizedTodoList;
        result.status(201).json({ 
            success: true,
            list: todoLists[id],
        })
    } catch (error) {
        result.status(500).json({error: "Failed to write to database"})
    }

});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
