import React, { useEffect, useState } from "react";
// import { getUserOrders } from "../operations/GetOrders";
import BidsCard from "./BidsCard";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast"
import OrderCard from "./OrderCard";
import {Link, useNavigate} from "react-router"
import OrderCardForFarmer from "./FarmerOrderDetail";
import HighlightedButton from './HighlightedButton'

const FarmerDashboard = ({orders, setCount}) => {
    // const [orders , setOrders] = useState([]);
    const {token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    console.log(orders);
    function handleOnChange(data){
        navigate("/orderDetails", {state: {data: data}})
    }
    // // const {user} = useSelector((state) => state.profile);

    // async function getOrders() {
    //     try{
    //         const res = await getUserOrders({token});
    //         setOrders(res);
    //     }
    //     catch(error){
    //         console.log(error);
    //         toast.error(error.message)
    //         setOrders([]);
    //     }
    // }

    // useEffect(() => {
    //     getOrders();
    // }, []);

    return (
        <div>
            <h2>Orders: </h2>
            <div className="flex flex-row flex-wrap mx-auto">
                {
                    token !== null ? (
                        orders && orders.length > 0 ? (
                            orders.map((data, index) => (
                                data.isActive && 
                                <div key={index} className=" flex flex-col mx-auto w-fit items-center">
                                    <OrderCard data={data}/>
                                    <HighlightedButton   onClick={() => handleOnChange(data)}
                                        text="order Details" className="mx-auto"/>
                                </div>
                                
                            ))
                        ) : (
                            <div>No orders available</div>
                        )
                    ) : (
                        <div>You are not logged in</div>
                    )
                }
            </div>
        </div>
    );
}

export default FarmerDashboard;