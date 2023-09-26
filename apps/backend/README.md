# ConfigBackend & PolicyDB
_Python + Flask + Sqlite_

### Description
- The backend is a REST Api
- Contains a CRUD for interacting with the PolicyDB, made in `sqlite` with `sqlalchemy` as ORM

The project is pretty simple, it is separated into 2 folders, models are the database models and data types, and views are the routes to access the backend. For now it is with CORS disabled.

The routes are:
| type | route | description |
|---|---|---|
|GET|`/policies/`|Retrieves all policies|
|POST|`/policies/`|Creates a new policy|
|PUT|`/policies/<string:id>`|Replaces a policy|
|GET|`/policies/<string:id>`|Retrieves a single policy|
|DELETE|`/policies/<string:id>`|Deletes a policy|

The database is currently stored in a file called `policies.db` to make it easier to debug and also to run the project without additional settings.

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