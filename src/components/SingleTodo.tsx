import { useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function SingleTodo({ todo, todos, setTodos }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number) => {
    if (!editText) {
      alert("Field cannot be empty");
      return;
    }
    setTodos(
      todos.map((singleTodo) =>
        singleTodo.id === id ? { ...singleTodo, todo: editText } : singleTodo
      )
    );
    setIsEditing(false);
  };

  return (
    <form
      className="todos__single"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {todo.isDone ? (
        <span
          style={{ textDecoration: "line-through" }}
          className="todos__single--text"
        >
          {todo.todo}
        </span>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      {isEditing && (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={() => {
              handleEdit(todo.id);
            }}
          >
            Edit
          </button>
        </div>
      )}

      <div>
        <span className="icon" onClick={() => setIsEditing(!isEditing)}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
}

export default SingleTodo;
