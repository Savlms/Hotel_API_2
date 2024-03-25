const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const database = require('./configs/database.config')
const roomTypeRouter = require('./routes/roomtype.route')
dotenv.config()
const port = process.env.PORT
const roomRouter = require('./routes/room.route')
const userRouter = require('./routes/user.route')
const cookie = require('cookie-parser')

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