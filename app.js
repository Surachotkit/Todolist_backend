require("dotenv").config();
const express = require("express");

const notFoundMiddleware = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const todoRoute = require('./routes/todo-route')

const app = express();
// แปลงค่า 
app.use(express.json())

app.use('/auth',authRoute)
app.use('/todo',todoRoute)

// verify token
// app.use(verifytoken)


// not found ของ middleware path ที่หาไม่เจอ
app.use(notFoundMiddleware)
app.use(errorMiddleware)



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server running on port" + PORT);
});
