import express from 'express'
import routes from './routes'
import MongoService from './repositories/mongodb/MongoService'

const app = express()

MongoService.connectDB()

app.use(express.json())
app.use(routes)

export { app }
