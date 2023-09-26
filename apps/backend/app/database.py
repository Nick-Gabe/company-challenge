from flask import Flask
from .models import Session, Base, engine
from .models.policy import Policy, Edge, Node, Viewport

session = Session()


class Database:
    def read_policies(self):
        return session.query(Policy).all()

    def read_policy(self, id: str):
        return session.query(Policy).get(id)

    def create_policy(self, title: str, edges: list[Edge], nodes: list[Node], viewport: Viewport):
        new_policy = Policy(
            title=title, edges=edges, nodes=nodes, viewport=viewport
        )
        session.add(new_policy)
        session.commit()

        return self.read_policy(id=new_policy.id)

    def update_policy(self, id: str, title: str, edges: list[Edge], nodes: list[Node], viewport: Viewport):
        session.query(Policy).filter_by(id=id).update({
            'title': title,
            'edges': edges,
            'nodes': nodes,
            'viewport': viewport
        }, synchronize_session='fetch')
        session.commit()

        return self.read_policy(id=id)

    def delete_policy(self, id: str):
        policy = session.query(Policy).filter_by(id=id)
        if policy.first() == None:
            return None

        policy.delete()
        session.commit()
        return not self.policy_exists(id=id)

    def policy_exists(self, id: str):
        return session.query(Policy).get(id) != None

    def close_connection(self, execution=None):
        session.close()


def create_database_tables():
    session = Session()
    Base.metadata.create_all(engine)
    session.commit()
    session.close()


class TypedCurrentApp(Flask):
    db: Database
