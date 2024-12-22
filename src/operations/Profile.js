
import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";
import toast from "react-hot-toast";
import {setToken} from "../slices/AuthSlice"
import {setUser} from "../slices/ProfileSlice"

async function getUserDetails({token}) {
    try {
        const {GET_PROFILE_INFO} = endpoints;
        const result = await apiConnector("GET", GET_PROFILE_INFO,
            null, null, {token: token}
        );
        return result;
    }
    catch (error) {
        console.log(error);
        toast.error(error.message);
        return;
    }
}

async function sendOtpMessage({token , mobile}) {
    try{
        const {SEND_OTP_MESSAGE} = endpoints;
        const result = await apiConnector("POST", SEND_OTP_MESSAGE, 
            {token, mobile}
        )
        return result;
    }
    catch(error){
        console.log(error);
        toast.error("Error while sending otp");
    }
}

async function verifyOtpMessage({token, otp, mobile}) {
    try {
        const {UPDATE_MOBILE} = endpoints;
        const result = await apiConnector("PUT", UPDATE_MOBILE,
            {token, otp, mobile}
        );
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
        toast.error("Error while verifying");
    }
}

async function updateImage({token, profilePic}) {
    try{
        const {UPDATE_IMAGE} = endpoints;
        const formData = new FormData();
        formData.append("profilePic", profilePic);
        const result = await apiConnector("PUT", UPDATE_IMAGE, 
            formData, null, {token}
        )
        console.log(result);
        return result;
    }
    catch(error){
        console.log(error);
        toast.error("Internal Server Error");
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export {getUserDetails, sendOtpMessage, verifyOtpMessage, updateImage};
