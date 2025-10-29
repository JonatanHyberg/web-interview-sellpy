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
      '1': {
        id: '1',
        title: 'First List',
        todos: [{text: 'First todo of first list!', completed: true, dueDate: null}],
      },
      '2': {
        id: '2',
        title: 'Second List',
        todos: [{text:'First todo of second list!', completed: false, dueDate: null}],
      },
    };

app.get('/', (request, result) => result.send('Hello World!'))


app.get('/api/lists', (request, result) => {
    result.json(todoLists);
});

//updated whole todo list based on listID
app.put('/api/lists/:listId/todos', (request, result) => {
    const { listId } = request.params;
    const todos = request.body;

    if (!todoLists[listId]) {
        return result.status(404).json({ error: "List not found" });
    }
    try {
        const normalizedTodoList = normalizeTodoList(todos);
        todoLists[listId].todos = normalizedTodoList;

        result.status(200).json({
        success: true,
        list: todoLists[listId],
        });
    } catch (error) {
        result.status(500).json({ error: "Failed to write to database" });
    }
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
