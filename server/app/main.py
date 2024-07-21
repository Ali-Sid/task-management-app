# # app/main.py
# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List

# from app import crud, models, schemas
# from app.database import engine, Base
# from app.dependencies import get_db

# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# @app.post("/tasks/", response_model=schemas.Task)
# def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
#     return crud.create_task(db=db, task=task)

# @app.get("/tasks/", response_model=List[schemas.Task])
# def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     tasks = crud.get_tasks(db, skip=skip, limit=limit)
#     return tasks

# @app.get("/tasks/{task_id}", response_model=schemas.Task)
# def read_task(task_id: int, db: Session = Depends(get_db)):
#     db_task = crud.get_task(db, task_id=task_id)
#     if db_task is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return db_task

# @app.put("/tasks/{task_id}", response_model=schemas.Task)
# def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
#     db_task = crud.update_task(db, task_id=task_id, task=task)
#     if db_task is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return db_task

# @app.delete("/tasks/{task_id}", response_model=schemas.Task)
# def delete_task(task_id: int, db: Session = Depends(get_db)):
#     db_task = crud.delete_task(db, task_id=task_id)
#     if db_task is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return db_task


# from fastapi import FastAPI
# from app.models import Base, Task  # Ensure the correct path
# from app.database import engine  # Ensure the correct path
# from app.routers import task_router

# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# app.include_router(task_router, prefix="/tasks", tags=["tasks"])

from fastapi import FastAPI
from app.routers.task_router import router as task_router  # Correct import

app = FastAPI()

app.include_router(task_router, prefix="/tasks", tags=["tasks"])

