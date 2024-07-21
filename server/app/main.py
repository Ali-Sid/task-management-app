from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from typing import List
from app.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tasks", response_model=List[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks

@app.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db=db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db=db, task=task)

@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = crud.update_task(db=db, task_id=task_id, task=task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@app.delete("/tasks/{task_id}", response_model=schemas.Task)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted_task = crud.delete_task(db=db, task_id=task_id)
    if deleted_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return deleted_task
