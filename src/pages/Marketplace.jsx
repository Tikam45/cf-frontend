import React from "react";
import { useState,useEffect } from "react";
import { getOrders } from "../operations/GetOrders";
import OrderCard from "../components/OrderCard";
import { Link } from 'react-router-dom';


const Marketplace = () => {
    const [data, setData] = useState([]);


    async function fetchData(){
        try {
            const response = await getOrders();
            const orders = response.data.orders;
            if(orders){
                console.log("hello", orders);
                setData(orders);
            }
            console.log("orders", response.data.orders, data);
        } catch (error) {
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
        <div>
            { data && 
                data.map((order, index) => (
                    <div key={index}>
                        <OrderCard data={order} />
                    </div>
                ))
            }
            {
                !data && <div>No Orders are availabe currently</div>
            }
            <Link to="/createOrder">Create New Order</Link>
        </div>
    )
}

export default Marketplace;