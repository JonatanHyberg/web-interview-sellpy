import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let todoLists = {
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [{text: 'First todo of first list!', completed: true}],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [{text:'First todo of second list!', completed: false}],
      },
    };

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/todos', (req, res) => {
    res.json(todoLists);
});

app.post('/api/todos', (req, res) => {
    const {id, todos} = req.body;

    if (!todoLists[id]) {
        return res.status(404).json({ error: "List not found" });
    }
    
    try {
        todoLists[id].todos = todos;
        res.status(201).json({ 
            success: true,
            list: todoLists[id],
        })
    } catch (error) {
        res.status(500).json({error: "Failed to write to database"})
    }

});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
