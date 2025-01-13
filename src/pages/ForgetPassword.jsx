
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OtpForForgotPassword, resetForgotPassword } from "../operations/ResetPassword";
import toast from "react-hot-toast";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [isSame , setIsSame] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (e) =>  {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const sendOtp = async(e) => {
        e.preventDefault();
        if(formData.email !== ""){
            const response = await OtpForForgotPassword({email: formData.email});
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setIsSame(true);
        }
        else{
            setIsSame(false);
            const result = await resetForgotPassword({email: formData.email, otp: formData.otp, password: formData.password, navigate});
        }
    }
    return (
        <div className="h-screen w-screen flex flex-col flex-wrap justify-center items-center">
            
            <div className="border-gray-800 border-2 gap-16 p-8 flex flex-col flex-wrap justify-center items-center rounded-md">
                <p>
                VERIFY EMAIL AND CHANGE PASSWORD
                </p>
                <form onSubmit={submitHandler} className="flex flex-col gap-8">
                    <div className="flex flex-row gap-3 w-full flex-wrap">
                        <input type="text" 
                        placeholder="Enter Email here"
                        id="email"
                        value={formData.email}
                        name="email"
                        onChange={changeHandler}
                        required
                        className="border-2 border-gray rounded w-8/12"
                        />
                        <button className="p-2 bg-purple-500 text-white rounded active:bg-purple-300" onClick={(e) => sendOtp(e)}>SEND OTP</button>
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="otp">Otp:</label>
                        <input 
                        type="text" 
                        placeholder="Enter OTP"
                        id="otp"
                        value={formData.otp}
                        name="otp"
                        onChange={changeHandler}
                        required
                        className="border-2 border-gray rounded"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="password">New Password:</label>
                        <input 
                        type="text" 
                        placeholder="Enter new Password"
                        value={formData.password}
                        name="password"
                        id="password"
                        onChange={changeHandler}
                        required
                        className="border-2 border-gray rounded"
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-4">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input 
                        type="text" 
                        placeholder="Confirm Your Password"
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={changeHandler}
                        required
                        className="border-2 border-gray rounded"
                        />
                    </div>
                    <button className="bg-purple-700 text-white p-1.5 rounded active:bg-purple-400" type="submit">Change Password</button>
                </form>
                {
                    isSame && 
                    <p>
                        Password and Confirm Password are not same
                    </p>
                }
            </div>
        </div>
    )
}

export default ForgetPassword;