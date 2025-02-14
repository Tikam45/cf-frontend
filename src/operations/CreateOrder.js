import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";
import toast from "react-hot-toast";

async function createOrder(formData, token) {
    try {
        
        const {CREATE_ORDER} = endpoints
        const result = await apiConnector("POST", CREATE_ORDER, 
            formData, null, {token}
        );
        toast.success(result?.data?.message || "Order Created Successfully")
        return result;
    } 
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Order could not be created");
        return ;
    }
}

export {createOrder};