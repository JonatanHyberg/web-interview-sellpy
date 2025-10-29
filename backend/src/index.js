import express from 'express'
import cors from 'cors'
import { PORT } from './config/serverConfig.js'
import todoRoutes from './routes/todoRouts.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', todoRoutes)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
