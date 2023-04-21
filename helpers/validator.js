class Validator {
    static validateTaskSchema(taskInfo) {
        // Validates if a correct schema has been provided.
        if (taskInfo.hasOwnProperty("task_id") &&
            taskInfo.hasOwnProperty("title") &&
            taskInfo.hasOwnProperty("description") &&
            taskInfo.hasOwnProperty("completed") && 
            typeof taskInfo.completed === 'boolean' &&
            taskInfo.title.length >= 3 &&
            taskInfo.description.length >= 5){
                return true;
        }
        return false;    
    }

    static validateUniqueTaskId(taskInfo, taskData) {
        // Validates if a unique task_id has been provided for a new task.
        let taskIdFound = taskData.tasks.some(task => task.task_id === taskInfo.task_id);
        if (taskIdFound) return false;
        return true;
    }

    static isValidTaskId(taskId, taskData) {
        // Validates if an existing task_id has been provided to update the task.
        let taskIdExist = taskData.tasks.some(task => task.task_id == taskId);
        if (taskIdExist) return true;
        return false;
    }
}

module.exports = Validator;
