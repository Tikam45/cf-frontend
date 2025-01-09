import React from "react";
import { useState,useEffect } from "react";
import { getOrders } from "../operations/GetOrders";
import OrderCard from "../components/OrderCard";
import { Link } from 'react-router-dom';
import getCropTypes from "../operations/getCropTypes";
import { filterContents } from "../utils/FilteringOrders";
import { sortOrders } from "../utils/SortingOrders";


const Marketplace = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [cropTypes , setCropTypes] = useState([]);
    const [cropType, setCropType] = useState("All");
    const [sortMethod, setsortMethod] = useState("Relevance");

    const sortData = (e) => {
        setsortMethod(e.target.value);
        if(e.target.value === "Relevance"){
            setLoading(true);
            const result = sortOrders({data: orderData, key: "createdAt", order: -1});
            setOrderData(result);
            setLoading(false);
        }
        else{
            setLoading(true);
            const result = sortOrders({data :orderData, key: e.target.value, order: 1});
            setOrderData(result);
            setLoading(false);
        }
    }

    const filterOrders = (value)=> {
        setCropType(value);
        if(value === "All"){
            setOrderData(data);
        }
        else{
            if(data.length> 0 && cropType){
                console.log("hi", data, data?.data);
                setLoading(true);
                const result = filterContents({data: data, key: "crop", value: value});
                console.log("filtered data", result);
                setOrderData(result);
                setLoading(false);
            }
        }
    }

    // useEffect(() => {
    //     filterOrders("All");
    // }, [])


    async function fetchData(){
        try {
            setLoading(true);
            const response = await getOrders();
            const orders = response?.data?.orders;
            const result = await getCropTypes();
            console.log("result", result);
            if(result){
                console.log(result?.data?.cropTypes);
                setCropTypes(result?.data?.cropTypes);
                // console.log(cropTypes);
                // console.log(cropTypes.length);
            }
            setLoading(false);
            if(orders){
                // console.log("hello", orders);
                setData(orders);
                setOrderData(orders);
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
                    <div className="flex justify-between px-8 border-b-[1px] pb-2 w-screen mb-5">
                        {   cropTypes && 
                            cropTypes.length > 0 && 
                            <div className=" no-underline">
                                <p>Filter By: </p>
                                <select
                                value={cropType}
                                onChange={(e) => filterOrders(e.target.value)}
                                className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                                >
                                    <option key="All" value="All">All</option>
                                    {
                                        cropTypes.map((data, index) => (
                                            <option key={data.crop} value={data.crop}>{data.crop}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        }
                        <div className="flex items-center gap-3 no-underline">
                            <p>Sort by:</p>
                            <select name="sort" id="sort"
                            value={sortMethod}
                            onChange={(e) => sortData(e)}
                            className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                            >
                                <option value="Relevence">Relevence</option>
                                <option value="price">Price</option>
                                <option value="area">Area</option>
                                <option value="createdAt">Upload Date</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-7">
                        { orderData.length > 0 && 
                            orderData.map((order, index) => (
                                <div key={index}>
                                    <OrderCard data={order} />
                                </div>
                            ))
                        }
                    </div>
                    {
                        orderData.length === 0 && <div className="w-screen mx-auto text-lg">No Orders are availabe currently</div>
                    }
                </div>
            }
            <Link className="w-fit bg-purple-800 p-2 text-white rounded ml-1.5 active:bg-purple-500" to="/createOrder">Create New Order</Link>
        </div>
    )
}

export default Marketplace;