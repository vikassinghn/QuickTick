import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../AuthContext";

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]); // ✅ Ensure tasks is always an array
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/signin");
    } else {
      fetchTasks();
    }
  }, [user]); // ✅ Only run when user changes

  const fetchTasks = async () => {
    if (!user?._id) return; // ✅ Prevent undefined errors
    try {
      const response = await axios.get(`http://localhost:1000/api/v1/list/getTasks/${user._id}`);
      console.log("Fetched Tasks:", response.data); // ✅ Debugging
      setTasks(response.data.tasks || []); // ✅ Ensure tasks is always an array
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const addTask = async () => {
    if (!inputs.title || !inputs.body) {
      toast.error("Please enter all fields.");
      return;
    }
    if (!user?._id) {
      toast.error("User not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:1000/api/v1/list/addTask", {
        title: inputs.title,
        body: inputs.body,
        userId: user._id, // ✅ Send userId instead of email
      });
      
      console.log("Task Added:", response.data); // ✅ Debugging
      toast.success("Task added successfully.");
      fetchTasks();
      setInputs({ title: "", body: "" });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:1000/api/v1/list/deleteTask/${taskId}`);
      toast.success("Task deleted successfully.");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const openUpdate = (task) => {
    setSelectedTask(task);
    setShowUpdate(true);
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="container d-flex flex-column align-items-center">
          <div className="w-50 p-3">
            <input
              type="text"
              placeholder="Title"
              className="form-control my-2"
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />
            <textarea
              placeholder="Body"
              className="form-control my-2"
              name="body"
              onChange={handleChange}
              value={inputs.body}
            />
            <button className="btn btn-dark w-100 mt-3" onClick={addTask}>
              Add Task
            </button>
          </div>
        </div>

        <div className="task-container">
          {tasks.length === 0 ? (
            <div className="text-center text-muted my-5">
              <h5>No tasks available. Add a new task above.</h5>
            </div>
          ) : (
            <div className="row">
              {tasks.map((task) => (
                <div className="col-lg-4 col-md-6 col-12 my-2" key={task._id}>
                  <TodoCards
                    title={task.title}
                    body={task.body}
                    id={task._id}
                    deleteTask={() => deleteTask(task._id)}
                    openUpdate={() => openUpdate(task)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showUpdate && (
        <Update
          task={selectedTask}
          closeUpdate={() => setShowUpdate(false)}
          refreshTasks={fetchTasks}
        />
      )}
    </>
  );
};

export default Todo;
