
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../operations/ResetPassword";
import { useSelector } from "react-redux";

const PasswordChangeForm = ({allowed}) => {
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [isSame , setIsSame] = useState(false);
    const [formData, setFormData] = useState({
        otp: "",
        password: "",
        confirmPassword: "",
    });
    useEffect(() => {
        if(!token){
            navigate("/");
        }
    }, [])

    const changeHandler = (e) =>  {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setIsSame(true);
        }
        else{
            setIsSame(false);
            const result = await resetPassword({token, otp: formData.otp, password: formData.password, navigate});
        }
    }
    return (
        <div className="h-screen w-screen flex flex-col flex-wrap justify-center items-center">
            <div className="border-gray-800 border-2 gap-16 p-8 flex flex-col flex-wrap justify-center items-center rounded-md">
                <p className="text-xl bold">Reset Your Password</p>
                <form onSubmit={submitHandler} className="flex flex-col gap-8">
                    <div className="flex flex-row justify-between">
                        <label htmlFor="otp">Otp:</label>
                        <input 
                        type="text" 
                        placeholder="Enter OTP"
                        id="opt"
                        value={formData.otp}
                        name="otp"
                        onChange={changeHandler}
                        required
                        className="border-2 border-black rounded"
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
                        className="border-2 border-black rounded"
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
                        className="border-2 border-black rounded"
                        />
                    </div>
                    <button className="bg-purple-700 text-white p-1.5 rounded text-md active:bg-purple-400" type="submit"> Change Password</button>
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

export default PasswordChangeForm;