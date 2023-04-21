const express = require('express');
const routes = require('express').Router();
const taskInfo = require('./routes/taskInfo');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

const PORT = 3000;

routes.get('/', (req, res) => {
    res.status(200).send("Welcome to Task Manager App.");
});

routes.use('/tasks', taskInfo);

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is successfully running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error)
});