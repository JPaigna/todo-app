BACK END SET UP:

mkdir ToDoApp
cd ToDoApp

mkdir backend frontend
cd backend

python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic[dotenv] aiofiles python-multipart

RUN: uvicorn main:app --reload


FRONT END SET UP:

cd TodoApp
npx create-react-app frontend

cd frontend

RUN: npm start

BACKEND API ENDPOINTS:
https://todo-app-backend-fopd.onrender.com/docs#/

/todos/     # GET/READ ALL

/todos/     #POST/CREATE

/todos/{todo_id}    #GET/READONE

/todos/{todo_id}    #PUT/UPDATE

/todos/{todo_id}    #DELETE
