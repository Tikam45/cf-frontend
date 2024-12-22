import { endpoints } from "./apis";
import { apiConnector } from "./apiCall";

// all bids of an order 
export async function getOrderBids({orderId}){
    try{
        const {GET_ORDER_BIDS} = endpoints;
        const response = await apiConnector("GET", GET_ORDER_BIDS,
            {
                orderId: orderId,
            }
        );

        return response;
    }
    catch(error){
        return [];
        console.log("Internal Server Error");
    }
}


// all buyer bids for dashboard
export async function getUserBids({token}) {
    try {
        const {GET_USER_BIDS} = endpoints;
        const response = await apiConnector("GET", GET_USER_BIDS,
            null, null, {token: token}
        )
        return response;
    } 
    catch (error) {
        return [];
        console.log("Internal Server Error");
    }
}
