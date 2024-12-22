import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";
import toast from "react-hot-toast";

// all live orders for marketplace
async function getOrders(){
    try{
        const {GET_LIVE_ORDERS} = endpoints;
        const response = await apiConnector("GET", GET_LIVE_ORDERS);
        console.log("tikam", response);
        return response;
    }
    catch(error){
        console.log("Internal Server Error");
        return [];
    }
}

// export default getOrders;

// all farmer orders for dashboard
async function getUserOrdersBidsAndDeals({token}) {
    try {
        const {GET_USER_DASHBOARD} = endpoints;
        const response = await apiConnector("GET", GET_USER_DASHBOARD,
            null, null, {token}
        )
        return response;
    } 
    catch (error) {
        console.log("Internal Server Error");
        
    }
}

async function getOrderDetails(orderId) {
    try {
        let {GET_ORDER_DETAILS} = endpoints;
        GET_ORDER_DETAILS = `${GET_ORDER_DETAILS}/${orderId}`;
        const response = await apiConnector("GET" , GET_ORDER_DETAILS,
            {orderId: orderId}
        )
        return response;
    }
    catch (error) {
        console.log(error);
        toast.error("Internal Server Error");
    }
}

export { getOrders, getUserOrdersBidsAndDeals, getOrderDetails };