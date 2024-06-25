import React, { useState } from "react";
import close from "/src/assets/close.svg";
import "./style.css";

type ModalProps = {
  closeModal: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      todoId: number;
      todoText: string;
    }>
  >;
  itemId: number;
  itemText: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type Todo = {
  id: number;
  text: string;
  time: string;
};

const Modal: React.FC<ModalProps> = ({
  closeModal,
  itemId,
  itemText,
  setTodos,
}) => {
  const [text, setText] = useState<string>(itemText);

  const FormEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, text };
        }
        return item;
      })
    );
    setText("");

    closeModal((prev) => {
      return { ...prev, show: false, todoId: 0, todoText: "" };
    });
  };

  return (
    <>
      <div id="modal" className="modal-todo hidden">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5>Change This Todo</h5>
            <img
              id="close"
              onClick={() =>
                closeModal((prev) => {
                  return { ...prev, show: false, todoId: 0, todoText: "" };
                })
              }
              src={close}
              alt=""
              width="25"
              height="25"
            />
          </div>
          <div className="card-body">
            <form onSubmit={FormEdit} id="form-edit" className="mb-3">
              <div className="mb-3">
                <input
                  id="inputEdit"
                  type="text"
                  className="mb-1 form-control"
                  placeholder="Type todo..."
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value.trim())}
                />
                <span id="message-edit" className="text-danger"></span>
              </div>
              <button className="btn btn-outline-success d-block ms-auto">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
      <div id="overlay" className="overlay hidden"></div>
    </>
  );
};

export default Modal;
