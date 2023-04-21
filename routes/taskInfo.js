const taskRoutes = require('express').Router();
// const bodyParser = require('body-parser');
const taskData = require('../tasks.json');
const Validator = require('../helpers/validator');
const path = require('path');
const fs = require('fs');

// taskRoutes.use(bodyParser.urlencoded({ extended: false }));
// taskRoutes.use(bodyParser.json());

const levels = ['high', 'medium', 'low'];

taskRoutes.get('/', (req, res) => {
    res.status(200).send(taskData);
});


taskRoutes.get('/:taskId', (req, res) => {
    let tasks = taskData.tasks;
    let taskIdPassed = req.params.taskId;
    let result = tasks.filter(task => task.task_id == taskIdPassed);
    
    if (result.length === 0) {
        return res.status(404).json({
            "error": "No Task found for given taskId."
        }); 
    }
    res.status(200).json(result);
});


taskRoutes.post('/', (req, res) => {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    if (Validator.validateTaskSchema(taskDetails)){
        if (Validator.validateUniqueTaskId(taskDetails, taskData)) {
            let tasksDataModified = JSON.parse(JSON.stringify(taskData));
            tasksDataModified.tasks.push(taskDetails);
            fs.writeFileSync(writePath, JSON.stringify(tasksDataModified), {encoding:'utf-8', flag:'w'});
            
            res.status(200).json({
                "success": "Task has been added successfully."
            });
        }
        else {
            res.status(400).json({
                "error": "TaskId has to be unique."
            });
        }
    }
    else {
        res.status(400).json({
            "error": "Please provide all the properties with correct data type."
        });
    }
});


taskRoutes.put('/:taskId', (req, res) => {
    if (Validator.isValidTaskId(req.params.taskId, taskData)) {

        let taskDetails = req.body;
        taskDetails.task_id = req.params.taskId;
        let writePath = path.join(__dirname, '..', 'tasks.json');

        if (Validator.validateTaskSchema(taskDetails, taskData)) {
            let tasksDataModified = JSON.parse(JSON.stringify(taskData));
        
            for (const task of tasksDataModified.tasks){
                if (task.task_id == req.params.taskId){
                    task.title = taskDetails.title;
                    task.description = taskDetails.description;
                    task.completed = taskDetails.completed;
                    break;
                }
            }

            fs.writeFileSync(writePath, JSON.stringify(tasksDataModified), {encoding: 'utf-8', flag: 'w'});
            res.status(200).json({
                "success": "Task updated successfully."
            });
        }
        else {
            res.status(400).json({
                "error": "Please provide all the properties with correct data type."
            });
        }
    }
    else {
        res.status(404).json({
            "error": "Please provide a valid TaskId."
        });
    }
});


taskRoutes.delete('/:taskId', (req, res) => {
    let tasksDataModified = JSON.parse(JSON.stringify(taskData));
    let writePath = path.join(__dirname, '..', 'tasks.json');
    
    let taskFound = false;
    for (const task of tasksDataModified.tasks){
        if (task.task_id == req.params.taskId){
            const index = tasksDataModified.tasks.indexOf(task);
            tasksDataModified.tasks.splice(index, 1);
            taskFound = true;
            break;
        }
    }

    if(!taskFound) {
        return res.status(404).json({
            "error": "Please provide a valid taskId."
        });
    }
    fs.writeFileSync(writePath, JSON.stringify(tasksDataModified), {encoding: 'utf-8', flag: 'w'});
    res.status(200).json({
        "success": "Task deleted successfully."
    });
});


taskRoutes.get('/priority/:level', (req, res) => {
    let priorityPassed = req.params.level.toLowerCase()
    if (levels.includes(priorityPassed)) {
        let filteredTasks = taskData.tasks.filter(task => task.priority === priorityPassed);

        if (filteredTasks.length === 0) {
            return res.status(404).json({
                "error": "No Task found for given priority."
            });
        }
        res.status(200).json(filteredTasks);
    }
    else {
        res.status(400).json({
            "error": "Please provide a valid priority."
        });
    }
});

module.exports = taskRoutes;
