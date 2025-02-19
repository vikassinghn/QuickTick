import React, { useState } from "react";
import "./Todo.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, taskId, deleteTask, openUpdate }) => {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="todo-card p-3 position-relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div className="todo-actions">
          <button className="btn btn-sm btn-light me-2" onClick={() => openUpdate(taskId)}>
            <GrUpdate />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => deleteTask(taskId)}>
            <RiDeleteBin2Fill />
          </button>
        </div>
      )}
      <h5 className="todo-title">{title}</h5>
      <p className="todo-body">{body}</p>
    </div>
  );
};

export default TodoCards;
