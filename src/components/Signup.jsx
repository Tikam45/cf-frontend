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
    <div className="flex flex-col items-center justify-center h-screen m-y-auto">
      {
        token && 
        <h2>You are already Signed up</h2>
      }
      {
        !token && 
        <div className="flex flex-col items-center gap-4 w-fit p-20 border-2 border-gray-300">
          <h2 className="bold text-2xl">Signup</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center"> 
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              required
              className="w-fit border-2 border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              onChange={handleOnChange}
              required
              className="w-fit border-2 border-gray-300 p-2"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleOnChange}
              required
              className="w-fit border-2 border-gray-300 p-2"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
              className="w-fit border-2 border-gray-300 p-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              required
              className="w-fit border-2 border-gray-300 p-2"
            />
            <button type="submit" className="w-fit p-3 text-white bg-gray-900 rounded hover:bg-gray-500 ">Signup  ➡️</button>
          </form>
          <Link to="/login" className="text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      }
    </div>
  );
};

export default Signup;