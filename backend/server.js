const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routers/goalsRouters'));

app.use('/api/users', require('./routers/userRouters'))

app.use(errorHandler);

app.listen(port, () => {
    console.log("This is port 3000");
});