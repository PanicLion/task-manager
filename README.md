
# Task Manager app built on Node & Express

A Task manager app where you have a title, description, priority along with a flag to mark it completed.

> priority can be one of {high, medium, low}

## Endpoints:

- **POST /tasks**: &emsp;&emsp;Add a task 
- **GET /tasks**: &emsp;&emsp;View all the tasks
- **GET /tasks?completed=<true/false>**: &emsp;&emsp;Filter the tasks based on completion status
- **GET /tasks/:taskID**: &emsp;&emsp;View a specific task
- **GET /tasks/priority/:level**: &emsp;&emsp;View tasks based on priority
- **PUT /tasks/:taskID**: &emsp;&emsp;Update a task
- **DELETE /tasks/:taskID**: &emsp;&emsp;Delete a task

