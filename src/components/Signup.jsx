import React, { useState } from "react";
// import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { apiConnector } from "../operations/apiCall";
import toast from "react-hot-toast";
import {setSignupData} from "../slices/AuthSlice"
import { useDispatch, useSelector } from "react-redux";
import {sendOtp} from "../operations/Auth"

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector(state=> state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { firstName, lastName, email, password, confirmPassword } = formData

  function handleOnChange(e) {
    setFormData( (prevData) =>({ ...prevData , [e.target.name] : e.target.value })                        
  )}

  function handleSubmit(e){
    e.preventDefault();
    if(password !== confirmPassword) {toast.error("Passwords do not match");  return ; }
    const signupData = {formData};
    dispatch(setSignupData(signupData))     
    // console.log("form data" , formData);
    // console.log("signupData" , signupData);                               
    dispatch(sendOtp(formData.email, navigate))                           
    setFormData({firstName: "", lastName: "",  email: "",  password: "",  confirmPassword: "",})
  }

  return (
    <div className="auth-container">
      {
        token && 
        <h2>You are already Signed up</h2>
      }
      {
        !token && 
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              onChange={handleOnChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleOnChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              required
            />
            <button type="submit">Signup</button>
          </form>
          <Link to="/login" className="toggle-link">
            Already have an account? Login
          </Link>
        </div>
      }
    </div>
  );
};

export default Signup;