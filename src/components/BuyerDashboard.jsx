
import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
// import { getOrderBids, getUserBids } from "../operations/GetBids";
import OrderCard from "./OrderCard";
import { Link, useNavigate } from "react-router-dom";
import { removeBid } from "../operations/Bids"
import toast from "react-hot-toast";
import { createDeal } from "../operations/Deal";


const BuyerDashboard = ({bids, setCount}) =>{

    // const [deals, setDeals] = useState([]);
    // const [bids, setBids] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [loading1, setLoading1] = useState(true);
    // const [error, setError] = useState(null);

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const deleteBid = async(bidId) => {
        const result = await removeBid({token , bid: bidId});
        console.log(result);
        if(result.data.success){
            toast.success("Bid removed Successfully");
            setCount((count) => count+1);
        }
        else{
            toast.error(result.data.message);
        }
    }

    // const AcceptBid = async (bidId) => {
    //     try {
    //         // Call API to create a deal
    //         const result = await createDeal({ bidId, token });
    
    //         // Log the result for debugging
    //         console.log(result);
    
    //         // Check if the API call was successful
    //         if (result?.data?.success) {
    //             toast.success(result.data.message); // Show success toast
    //             navigate("/dashboard"); // Navigate to the dashboard
    //         } else {
    //             // Handle case when success is false
    //             toast.error(result?.data?.message || "Something went wrong.");
    //         }
    //     } catch (error) {
    //         console.error("Error in AcceptBid:", error);
    
    //         // Handle specific error responses gracefully
    //         if (error?.response?.data?.message) {
    //             toast.error(error.response.data.message);
    //         } else {
    //             toast.error("Internal Server Error");
    //         }
    //     }
    // };
    
    // const {user} = useSelector((state ) => state.profile);

    // useEffect(()=>{
    //     const fetchDeals = async() =>{
    //         try{
    //             const result = await getDeals({token});
    //             setDeals(result);

    //         }
    //         catch(error){
    //             setError(error);
    //         }
    //         finally{
    //             setLoading(false);
    //         }
    //     }

    //     fetchDeals();
    // }, []);

    // useEffect(()=>{
    //     const fetchBids = async() =>{
    //         try{
    //             console.log("hi");
    //             const result = await getUserBids({token});
    //             setBids(result.data.bids);
    //             console.log("result" , result);

    //         }
    //         catch(error){
    //             setError(error);
    //         }
    //         finally{
    //             setLoading(false);
    //         }
    //     }

    //     fetchBids();
    // }, []);
    
    // if (loading) {
    //     return <div className="loading">Loading...</div>;
    // }

    // if (error) {
    // return <div className="error">Error: {error.message}</div>;
    // }
    return(
        <div>
            <h2>Bids: </h2>
            {/* {
                deals.length === 0 ? 
                (
                    <div>You have not closed any deal till now</div>
                )
                :
                (
                    <div>
                        {
                            deals.map((deal ,key) => (
                                <div key={key}>
                                    <OrderCard crop = {deal.crop} land = {deal.land} photo = {deal.photo} price = {deal.price} />
                                </div>
                            ))
                        }
                    </div>
                )
            } */}

            {
                bids.length === 0 ? 
                (
                    <div>You have no open Bids</div>
                )
                :
                (
                    <div>
                        {
                            bids.map((bid ,key) => (
                                <div key={key}>
                                    <div>{bid.price}</div>
                                    <div>{bid.description}</div>
                                    <button onClick={() => deleteBid(bid._id)}>Delete this bid</button>
                                    <Link to={`/order/${bid.order._id}`}>More Details</Link>
                                    {/* <button onClick={()=> AcceptBid(bid._id)} >Accept Bid</button> */}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default BuyerDashboard;