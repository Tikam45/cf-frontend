
import toast from "react-hot-toast";
import { apiConnector } from "./apiCall";
import { endpoints } from "./apis";

const createBid = async({ description, orderId, price, token}) => {
    try{
        const {CREATE_BID} = endpoints;
        const response = await apiConnector("POST", CREATE_BID, 
            { description, orderId, price, token}
        )
        console.log("print ", response);
        toast.success(response?.data?.message);
        return response;
    }
    catch(error){
        // console.log("hfjhf")
        toast.error(error?.response?.data?.message);
        return;
    }
}

const removeBid = async({token, bid}) => {
    try {
        const {DELETE_BID} = endpoints;
        const response = await apiConnector("DELETE", DELETE_BID, 
            {token, bid}
        )
        return response;
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}

export {createBid, removeBid};