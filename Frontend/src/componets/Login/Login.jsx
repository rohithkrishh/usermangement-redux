import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";
import { Mail, Lock } from 'lucide-react';
import { login } from '../../redux/slice/UserSlice';
import axiosInstance from "../../utils/axiosInstance";
import "../../assets/styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "email") setEmailError("");
    if (e.target.name === "password") setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    if (!formData.email) {
      setEmailError("Email is required");
      formValid = false;
    }
    if (!formData.password) {
      setPasswordError("Password is required");
      formValid = false;
    }

    if (!formValid) return;

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      const user = response.data.user;

      dispatch(login({ user }));

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        toast.error("Admins cannot login as users.");
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <button type="submit">Sign in</button>
          </form>
          <a className="signup-link" href="/signup">
            Signup?
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;

