# Config Backend // Policy DB // Execution Engine
_Python + Flask + Sqlite_

### Description
- The backend is a REST Api
- Contains a CRUD for interacting with the PolicyDB, made in `sqlite` with `sqlalchemy` as ORM

The project is pretty simple, it is made based on MVC architecture, views are the endpoints, models are the database models and data types, and services are more complex functions used by views. For now the backend is with CORS disabled.

The routes are:
| type | route | description |
|---|---|---|
|GET|`/policies/`|Retrieves all policies|
|POST|`/policies/`|Creates a new policy|
|PUT|`/policies/<string:id>`|Replaces a policy|
|GET|`/policies/<string:id>`|Retrieves a single policy|
|DELETE|`/policies/<string:id>`|Deletes a policy|
|POST|`/execute/<string:id>`|Executes a policy|

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
[](#how-the-execution-engine-works)
### About the Policy DB
It is made using `sqlite` because it comes together with Python and for simple purposes it fullfills our needs! The database is currently local, being stored in a file called `policies.db`. It's data modeling is not so strict since the data from frontend is always changing, that being ids, values and so on.

It also uses `sqlalchemy` as an ORM for interacting with the database easily without needing to write SQL queries manually.

### How the Execution Engine works
Since it is one of the most important tasks, I wanted to describe how it works.

The execution engine is also made using Python, and it works like a binary tree search, based on the results it gets, it only "reads" the verifications that will be used, without spending unnecessary time checking everything.

Let's suppose my policy is the following:
- Age > 18 ? Continue
  - Income > 1000 ? Approved
  - Else ? Continue
    - Income > 5000 ? Approved
    - Else ? Denied
- Else ? Denied

Now if I execute it with the data `{ age: 19, income: 900 }`, it will fail in the first check and won't bother checking anything else. But if my data is `{ age: 15, income: 9000}`, it will pass the age check, pass the income check, and will not even read the else condition about income > 5000.

And it also uses the same database as the policies, so the data fetching is super fast and almost real time, changes affect made on it affect the backend and the execution engine almost immediately.