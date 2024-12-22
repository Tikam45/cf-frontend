import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";
import toast from "react-hot-toast";

async function removeOrder({orderId, token}) {
    try {
        
        const {REMOVE_ORDER} = endpoints
        const result = await apiConnector("DELETE", REMOVE_ORDER, 
            {orderId: orderId, token: token}
        );
        return result;
    } 
    catch (error) {
        toast.error(error.message);
        return ;
    }
}

export {removeOrder};