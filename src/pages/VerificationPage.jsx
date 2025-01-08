import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../operations/Auth";
import { useNavigate } from "react-router-dom";
// import "../components/VerifyEmail.css"

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access to this route when user has filled the signup form
    // if (!signupData) navigate("/signup");
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    if (signupData) {
      const { firstName, lastName, email, password, confirmPassword } = signupData.formData;
      console.log("Signup Data:", signupData);
      dispatch(
        signUp({ firstName, lastName, email, password, confirmPassword, otp, navigate })
      );
    } else {
      console.error("Signup data is missing");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {loading ? (
        <div className=""></div>
      ) : (
        <div className="p-4 border-black border-2 rounded flex flex-col justify-center items-center gap-3">
          <h1 className="text-lg mb-2">Verify Your Email</h1>
          <p className="">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup} className="flex flex-col justify-center items-center gap-3">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="border-gray-500 border-2 rounded mx-2"
                />
              )}
              containerStyle="my-2"
            />
            <button type="submit" className="bg-purple-700 text-white p-2 rounded px-6">
              Verify Email
            </button>
          </form>
          <div className="flex flex-row mt-6 justify-between w-full">
            <Link to="/signup" className="">
              <div className="flex items-center gap-2 bg-gray-800 text-white p-2 rounded active:bg-gray-500">
              <BiArrowBack /> 
              <p>Back To Signup</p>
              </div>
            </Link>
            <button
              className=""
              onClick={() => {
                  dispatch(sendOtp(signupData?.formData.email, navigate))
                  // console.log("data", signupData)
                  // console.log( String(signupData.formData.email))
                }
              }
            >
              <div className="flex items-center gap-2 bg-gray-800 text-white p-2 rounded active:bg-gray-500">
              <RxCountdownTimer /> 
              <p>Resend it</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
