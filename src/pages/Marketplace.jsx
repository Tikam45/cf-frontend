import React from "react";
import { useState,useEffect } from "react";
import { getOrders } from "../operations/GetOrders";
import OrderCard from "../components/OrderCard";
import { Link } from 'react-router-dom';


const Marketplace = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    async function fetchData(){
        try {
            setLoading(true);
            const response = await getOrders();
            const orders = response?.data?.orders;
            setLoading(false);
            if(orders){
                console.log("hello", orders);
                setData(orders);
            }
            console.log("orders", response?.data?.orders, data);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log("changed data", data);
    // }, [data]);

    return (
        <div className="mt-4 flex flex-col gap-8 w-screen">
            {
                loading &&
                <div className="mx-auto">
                    Fetching the Orders...
                </div>
            }
            {   !loading && 
                <div className="">
                    <div className="flex flex-wrap gap-7">
                        { data.length > 0 && 
                            data.map((order, index) => (
                                <div key={index}>
                                    <OrderCard data={order} />
                                </div>
                            ))
                        }
                    </div>
                    {
                        data.length === 0 && <div className="w-screen mx-auto text-lg">No Orders are availabe currently</div>
                    }
                </div>
            }
            <Link className="w-fit bg-purple-800 p-2 text-white rounded ml-1.5 active:bg-purple-500" to="/createOrder">Create New Order</Link>
        </div>
    )
}

export default Marketplace;