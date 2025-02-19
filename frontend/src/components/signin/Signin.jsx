import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";  // Import AuthContext
import "./Signin.css";

const Signin = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();  // Get login function from context

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/signin",
        inputs,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      alert("Sign In Successful!");
      console.log("User Data:", response.data);

      // Use login function to update auth state
      login(response.data.user);

      // Redirect to the todo page
      navigate("/todo");
    } catch (error) {
      alert(error.response?.data?.message || "Sign In Failed");
      console.error("Sign In Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin d-flex align-items-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center shadow-lg rounded-4 overflow-hidden">
          <div className="col-md-6 text-center bg-dark text-white p-5 d-flex flex-column justify-content-center">
            <h1 className="fw-bold">Welcome Back</h1>
            <p className="mt-3">Sign in to access your account.</p>
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="text-center fw-bold mb-4">Sign In</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control p-3"
                  name="email"
                  value={inputs.email}
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
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-dark p-3 fw-bold" type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link className="nav-link btn btn-dark rounded px-4 mx-2" to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
