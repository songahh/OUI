from pydantic import BaseModel

class DailyDiary(BaseModel):
    text: str
