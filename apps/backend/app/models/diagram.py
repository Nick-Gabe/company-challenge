from sqlalchemy import Column, Integer, String, JSON
from dataclasses import dataclass
from ..models import Base


@dataclass
class Diagram(Base):
    __tablename__ = 'diagrams'
    id: int = Column(Integer, primary_key=True)
    title: str = Column(String)
    edges: str = Column(JSON)
    nodes: str = Column(JSON)
    viewport: str = Column(JSON)


class Edge:
    id: str
    source: str
    target: str
    animated: str
    label: str
    sourceHandle: str
    targetHandle: str


class NodePosition():
    x: int
    y: int


class NodeData():
    maxConnections: int
    isConnectable: bool
    parameter: str
    operation: str
    value: str
    decision: str


class Node:
    id: str
    data: str
    height: int
    position: str
    positionAbsolute: str
    type: str
    width: int
    deletable: bool
    selected: bool
    dragging: bool


class Viewport:
    x: int
    y: int
    zoom: int
