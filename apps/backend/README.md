# ConfigBackend & PolicyDB
_Python + Flask + Sqlite_

### Description
- The backend is a REST Api
- Contains a CRUD for interacting with the PolicyDB, made in `sqlite` with `sqlalchemy` as ORM

The project is pretty simple, it is separated into 2 folders, models are the database models and data types, and views are the routes to access the backend. For now it is with CORS disabled.

The routes are:
| type | route | description |
|---|---|---|
|GET|`/diagrams/`|Retrieves all diagrams|
|POST|`/diagrams/`|Creates a new diagram|
|PUT|`/diagrams/<string:id>`|Replaces a diagram|
|GET|`/diagrams/<string:id>`|Retrieves a single diagram|
|DELETE|`/diagrams/<string:id>`|Deletes a diagram|

These routes mention Diagrams which is what the FrontEnd sees. The diagrams data is only used to visually see the policies and change them.

The database is currently stored in a file called `diagrams.db` to make it easier to debug and also to run the project without additional settings.

### How to run
In order to run the Backend you need Python on your system and then download the project dependencies:
```shell
# Make sure you're in the root of the backend project
# If you're on windows use just pip instead of pip3
pip3 install -r requirements.txt
```

After downloading the dependencies you can start the backend:
```shell
# If you're on windows use "pnpm dev-win"
pnpm dev
```