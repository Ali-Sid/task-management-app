from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "todo"

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
