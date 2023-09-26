from flask import Flask
from .models import Session, Base, engine
from .models.diagram import Diagram, Edge, Node, Viewport


class Database:
    def __init__(self):
        self.session = Session()

    def read_diagrams(self):
        return self.session.query(Diagram).all()

    def read_diagram(self, id: str):
        return self.session.query(Diagram).get(id)

    def create_diagram(self, title: str, edges: list[Edge], nodes: list[Node], viewport: Viewport):
        new_diagram = Diagram(
            title=title, edges=edges, nodes=nodes, viewport=viewport
        )
        self.session.add(new_diagram)
        self.session.commit()

        return self.read_diagram(id=new_diagram.id)

    def update_diagram(self, id: str, title: str, edges: list[Edge], nodes: list[Node], viewport: Viewport):
        self.session.query(Diagram).filter_by(id=id).update({
            'title': title,
            'edges': edges,
            'nodes': nodes,
            'viewport': viewport
        }, synchronize_session='fetch')
        self.session.commit()

        return self.read_diagram(id=id)

    def delete_diagram(self, id: str):
        diagram = self.session.query(Diagram).filter_by(id=id)
        if diagram.first() == None:
            return None

        diagram.delete()
        self.session.commit()
        return not self.diagram_exists(id=id)

    def diagram_exists(self, id: str):
        return self.session.query(Diagram).get(id) != None

    def close_connection(self, execution=None):
        self.session.close()


def create_database_tables():
    session = Session()
    Base.metadata.create_all(engine)
    session.commit()
    session.close()


class TypedCurrentApp(Flask):
    db: Database
