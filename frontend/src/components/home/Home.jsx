import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center">
        <h1 className="display-4 fw-bold">Conquer your tasks, <br /> One step at a time.</h1>
        <p className="lead text-muted mt-3">
          Take control of your tasks with <strong>QuickTick</strong>. <br /> 
          Organize, prioritize, and achieve your goals effortlessly.
        </p>
        <button className="btn btn-dark btn-lg mt-4">Make a Notepad Now!</button>
      </div>
    </div>
  );
};

export default Home;
