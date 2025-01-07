
import { endpoints } from "./apis"
import { apiConnector } from "./apiCall"
import toast from "react-hot-toast";


const createDeal = async({bidId, token}) => {
    try {
        const {CREATE_DEAL} = endpoints;

        const result = await apiConnector("POST", CREATE_DEAL, 
            {bidId, token}
        )
        toast.success(result?.data?.message);
        console.log(result);
        return result;
    }
    catch (error) {
        toast.error(error?.response?.data?.message || "Internal Server Error")
        console.log(error);
        return error;
    }
}


export {createDeal};