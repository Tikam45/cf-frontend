
import { endpoints } from "./apis"
import { apiConnector } from "./apiCall"


const createDeal = async({bidId, token}) => {
    try {
        const {CREATE_DEAL} = endpoints;

        const result = await apiConnector("POST", CREATE_DEAL, 
            {bidId, token}
        )
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}


export {createDeal};