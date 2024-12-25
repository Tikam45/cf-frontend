import React, { useState } from "react";
// import "./Auth.css";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../operations/Auth"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({email: "",  password: "" })
  // const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData


  function handleOnChange(e) {
    setFormData( (prevData) =>({ ...prevData , [e.target.name] : e.target.value })                        
)}

  
  function handleOnSubmit(e){
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        token && 
        <h3>You are already Logged in</h3>
      }
      {
        !token && 
        <div className="flex flex-col items-center justify-center w-fit gap-4 p-20 border-2 border-gray-300">
          <h2 className="bold text-2xl">Login</h2>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleOnChange}
              required
              className="mb-4 w-fit border-2 border-gray-300 p-2"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
              className="mb-4 w-fit border-2 border-gray-300 p-2"
            />
            <button type="submit" className="bg-gray-900 text-white p-3 rounded hover:bg-gray-500">Login ➡️</button>
          </form>
          <Link to="/signup" className="text-blue-500">
            Don't have an account? Signup
          </Link>
        </div>
      }
    </div>
  );
};

export default Login;
