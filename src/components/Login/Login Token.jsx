import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { showSuccessNotification,showErrorNotification, } from "../../helper/notificationHelper";
import { useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [token]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${API_URL}/api/login`, loginData);
      const token = response?.data?.data.token;
      localStorage.setItem('token', token);
      console.log('Token stored in local storage:', token);
      showSuccessNotification("Success", response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error storing token in local storage:', error);
      showErrorNotification("Error", "An error occurred.");
    }
  };


  const handleLogout = () => {
    // Remove token from local storage and state on logout
    localStorage.removeItem("token");
    setToken("");
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Use the 'headers' object in your API requests to include the token

  return (
    <>
      {token ? (
        <>
          <p>Token stored in local storage: {token}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default App;
