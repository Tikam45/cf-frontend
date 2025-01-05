
import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";
import toast from "react-hot-toast";

const OtpForPasswordChange = async({token, navigate}) => {
    const toastId = toast.loading("Sending Otp");
    try{
        const {SENDOTP_FOR_PASSWORD_CHANGE} = endpoints;
        const response = await apiConnector("POST", SENDOTP_FOR_PASSWORD_CHANGE, 
            {
                token: token
            }
        )

        if(response?.data?.success){
            toast.dismiss(toastId);
            toast.success(response?.data?.message);
            navigate("/change-password-form")
        }
        if(!response?.data?.success){
            toast.dismiss(toastId);
            toast.error(response?.data?.message || "Couldn't send Otp")
        }
        return response;
    }
    catch(error){
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Internal Server Error")
    }
}

const resetPassword = async({token, otp, password, navigate}) => {
    const toastId = toast.loading("Changing Password");
    try{
        const {RESET_PASSWORD} = endpoints;
        const response = await apiConnector("PUT",RESET_PASSWORD, {token, otp, newPassword: password});
        console.log(response);

        if(response?.data?.success){
            toast.dismiss(toastId);
            toast.success(response?.data?.message);
            navigate("/profile")
        }
        if(!response?.data?.success){
            toast.dismiss(toastId);
            toast.error(response?.data?.message || "Couldn't change password")
        }
        return response;
    }
    catch(error){
        console.log("Hele", error);
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Internal Server Error")
    }
}

export {OtpForPasswordChange, resetPassword};