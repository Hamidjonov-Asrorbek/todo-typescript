import React, { useState, useEffect } from "react";
import del from "/src/assets/delete.svg";
import edit from "/src/assets/edit.svg";
import "./style.css";
import Modal from "../Modal";

type Todo = {
  id: number;
  text: string;
  time: string;
  completed: boolean;
};

type ModalState = {
  show: boolean;
  todoId: number;
  todoText: string;
};

const Form: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [text, setText] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [modal, setModal] = useState<ModalState>({
    show: false,
    todoId: 0,
    todoText: "",
  });

  const FormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let date = new Date();
    let newTodo: Todo = {
      id: date.getTime(),
      text,
      time: getTime(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const deleteTodo = (todoId: number): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const toggleCompleted = (todoId: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getTime = (): string => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minute =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    return `${hour}:${minute}, ${date}`;
  };

  return (
    <>
      <form id="form-create" className="mb-3" onSubmit={FormSubmit}>
        <div className="mb-3">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            id="inputCreate"
            type="text"
            className="mb-1 form-control"
            placeholder="Enter todo..."
            required
          />
          <button
            id="add_btn"
            className="btn btn-outline-primary d-block ms-auto"
          >
            Add
          </button>
          <span id="message-create" className="text-danger d-block"></span>
        </div>
      </form>
      <ul
        id="list-group-todo"
        className="list-group d-flex justify-content-between"
      >
        {todos.length
          ? todos.map(({ id, text, time, completed }) => {
              return (
                <li
                  className={`list-group-item ${completed ? "completed" : ""}`}
                  key={id}
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleCompleted(id)}
                  />
                  <p>{text}</p>
                  <div className="align-items-center gap-5">
                    <span className="opacity-50 me-2">{time}</span>
                    <img
                      src={edit}
                      onClick={() =>
                        setModal({ show: true, todoId: id, todoText: text })
                      }
                      width="25"
                      style={{ marginInline: "10px" }}
                      alt="edit"
                    />
                    <img
                      src={del}
                      onClick={() => deleteTodo(id)}
                      width="25"
                      alt="delete"
                    />
                  </div>
                </li>
              );
            })
          : "No todos 😶 :)"}
      </ul>
      {modal.show && (
        <Modal
          setTodos={setTodos}
          itemId={modal.todoId}
          itemText={modal.todoText}
          closeModal={setModal}
        />
      )}
    </>
  );
};

export default Form;
