import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = ({ task, closeUpdate, refreshTasks }) => {
  const [updatedTask, setUpdatedTask] = useState({ title: "", body: "" });

  useEffect(() => {
    if (task) {
      setUpdatedTask({ title: task.title, body: task.body });
    }
  }, [task]);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      if (!updatedTask.title || !updatedTask.body) {
        toast.error("All fields are required.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/updateTask/${task._id}`,
        updatedTask
      );

      if (response.status === 200) {
        toast.success("Task updated successfully.");
        refreshTasks(); // Fetch updated tasks after update
        closeUpdate(); // Close modal
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <ToastContainer />
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <div className="modal-header">
            <h3 className="modal-title">Update Task</h3>
            <button type="button" className="btn-close" onClick={closeUpdate}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control my-3"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              placeholder="Update Title"
            />
            <textarea
              className="form-control my-3"
              name="body"
              value={updatedTask.body}
              onChange={handleChange}
              placeholder="Update Task Details"
            ></textarea>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn btn-secondary" onClick={closeUpdate}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
