import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:1000/api/v1/register", formData);
      toast.success(data.message);
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="signup d-flex align-items-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center shadow-lg rounded-4 overflow-hidden">
          <div className="col-md-6 text-center bg-dark text-white p-5 d-flex flex-column justify-content-center">
            <h1 className="fw-bold">Join Us</h1>
            <p className="mt-3">Create an account to get started.</p>
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="text-center fw-bold mb-4">Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control p-3"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  className="form-control p-3"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="form-control p-3"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-dark p-3 fw-bold" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link className="nav-link btn btn-outline-dark rounded px-4 mx-2" to="/signin">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
