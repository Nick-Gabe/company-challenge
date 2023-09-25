from sqlalchemy import Column, Integer, String
from dataclasses import dataclass
from ..models import Base


@dataclass
class Diagram(Base):
    __tablename__ = 'diagrams'

    id: int = Column(Integer, primary_key=True)
    text: str = Column(String)

    def __init__(self, text: str, id=None):
        self.text = text
        if id:
            self.id = id

    def __repr__(self):
        return f"<Diagram(id={self.id}, text='{self.text}')>"
