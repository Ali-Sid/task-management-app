# Task Management App

## Project Overview

The Task Management App is a full-stack application designed to manage tasks efficiently. It includes a backend API for task management and a frontend interface for user interaction. The application supports creating, reading, updating, and deleting tasks, and it is fully deployed for public access.

## Technologies Used

### Backend

- **FastAPI**: Modern web framework for building APIs with Python.
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM) library for Python.
- **SQLite**: Lightweight, disk-based database.
- **Uvicorn**: ASGI server for serving the FastAPI application.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Material UI**: Styling framework for developing responsive and mobile-first websites.
- **Chakra UI**: Component library for styling.
- **Axios**: Promise-based HTTP client for handling API requests.

### Deployment

- **Render**: Cloud platform for deploying backend services.
- **Vercel**: Cloud platform for building and deploying frontend applications.

## Features

### Backend Endpoints:

- `GET /tasks`: Retrieves all tasks.
- `POST /tasks`: Creates a new task.
- `GET /tasks/{id}`: Retrieves a task by its ID.
- `PUT /tasks/{id}`: Updates a task by its ID.
- `DELETE /tasks/{id}`: Deletes a task by its ID.

### Frontend Components:

- **TaskList**: Displays a list of all tasks.
- **TaskForm**: Provides a form to add a new task.
- **TaskItem**: Shows details of individual tasks with options to update or delete.

## Installation

### Clone the Repository:

`git clone https://github.com/Ali-Sid/task-management-app.git cd task-management-app`


### Set Up Backend:

Navigate to the server directory.

Create a virtual environment and install dependencies:

```python -m venv venv ```
```source venv/bin/activate # On Windows use .\Scripts\activate ```
```pip install -r requirements.txt```

Run the FastAPI server:
```uvicorn app.main:app --reload```

### Set Up Frontend:

Navigate to the frontend directory.

Install dependencies:
```npm install```


Run the React application:

``` npm run dev ```


## Deployment

- **Backend**: Deployed on Render with automatic deployment pipeline.
- **Frontend**: Deployed on Vercel with automatic deployment pipeline.

## Challenges and Solutions

- **Backend Configuration**: Resolved issues with Uvicorn and SQLAlchemy imports by configuring the virtual environment correctly and ensuring proper dependency installation.
- **Deployment**: Addressed deployment issues by configuring build logs and ensuring proper app setup.

## Contribution

Feel free to open issues or submit pull requests to contribute to the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
