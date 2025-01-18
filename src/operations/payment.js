
import { endpoints } from "./apis";
import {apiConnector} from "./apiCall"
import toast from "react-hot-toast";

export const createPaymentOrder = async({amount}) => {
    try{
        const {CHECKOUT} = endpoints;
        const response = await apiConnector("POST", CHECKOUT, {
            amount
        });

        return response;
    }
    catch(error){
        toast.error(error?.response?.data?.message || "Internal Server Error");

    }
}