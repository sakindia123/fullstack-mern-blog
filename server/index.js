import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import connect from './database/db.js'
import Router from './routes/route.js'
const PORT = 5000

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))

app.use('/', Router)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

connect()