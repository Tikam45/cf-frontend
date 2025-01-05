
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {OtpForPasswordChange} from "../operations/ResetPassword"

const  ResetPassword = () => {
    const {token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(!token){
            navigate("/login");
        }
    }, []);

    const handleSubmit = async() => {
        const result = await OtpForPasswordChange({token, navigate});
    }
    return (
        <div className="h-screen w-screen flex  justify-center items-center">
            <div className="flex flex-col justify-center items-center border-gray-900 border-2 p-5 gap-8">
                <p className="text-black bold text-lg">
                    Reset Password
                </p>
                <p className="">
                    We will send a OTP to your registered email address
                </p>
                <button className=" text-white bg-gray-800 p-2 w-full rounded" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    )
}

export default ResetPassword;