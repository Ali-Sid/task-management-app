from sqlalchemy.orm import Session
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate

def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def get_tasks(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Task).offset(skip).limit(limit).all()

def create_task(db: Session, task: TaskCreate):
    db_task = Task(title=task.title, description=task.description)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task: TaskUpdate):
    db_task = get_task(db, task_id)
    if db_task:
        db_task.title = task.title
        db_task.description = task.description
        db_task.status = task.status
        db.commit()
        db.refresh(db_task)
        return db_task
    return None

def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
        return db_task
    return None
