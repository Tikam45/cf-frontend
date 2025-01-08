
import {endpoints} from "./apis"
import {apiConnector} from "./apiCall"

const getCropTypes = async() => {
    try{
        const {GET_CROP_TYPES} = endpoints;
        const response = await apiConnector("GET", GET_CROP_TYPES);
        return response;
    }
    catch(error){
        return [];
    }
}

export default getCropTypes;