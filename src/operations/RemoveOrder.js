import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";
import toast from "react-hot-toast";

async function removeOrder({orderId, token}) {
    try {
        
        const {REMOVE_ORDER} = endpoints
        const result = await apiConnector("DELETE", REMOVE_ORDER, 
            {orderId: orderId, token: token}
        );
        toast.success(result?.data?.message);
        return result;
    } 
    catch (error) {
        toast.error(error?.response?.data?.message || "Internal Server Error" );
        return ;
    }
}

export {removeOrder};