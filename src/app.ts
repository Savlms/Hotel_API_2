import express from 'express';
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import database from './configs/database.config'
import roomTypeRouter from './routes/roomtype.route'
dotenv.config()
const port = process.env.PORT
import roomRouter from './routes/room.route'
import userRouter from './routes/user.route'
import cookie from 'cookie-parser'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookie())
app.use(roomRouter)
app.use(roomTypeRouter)
app.use(userRouter)
app.get('/', (req, res) => {
    res.send('Hello, welcome to Savlms hotel')
})

app.listen(port, () => {
    database()
    console.log(`server started on ${port}`)
})