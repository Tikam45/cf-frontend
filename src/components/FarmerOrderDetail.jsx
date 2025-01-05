import React, { useEffect } from "react";
import {useLocation, useNavigate} from "react-router"
import toast from "react-hot-toast";
import { removeOrder } from "../operations/RemoveOrder";
import { useSelector } from "react-redux";
import { createDeal } from "../operations/Deal";


const OrderCardForFarmer = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const location = useLocation();
  const {data} = location.state || {};
  console.log(data);

  async function deletOrder(){
    const toastId = toast.loading("Loading");
    const response = await removeOrder({orderId: data._id, token: token})
    toast.dismiss(toastId);
    if(response.data.success){
      toast.success("Order Removed");
    }
    else{
      toast.error(response.data.message);
    }
    navigate("/dashboard");
  }

const AcceptBid = async (bidId) => {
  try {
      // Call API to create a deal
      const result = await createDeal({ bidId, token });

      // Log the result for debugging
      console.log(result);

      // Check if the API call was successful
      if (result?.data?.success) {
          toast.success(result.data.message); // Show success toast
          navigate("/dashboard"); // Navigate to the dashboard
      } else {
          // Handle case when success is false
          toast.error(result?.data?.message || "Something went wrong.");
      }
  } catch (error) {
      console.error("Error in AcceptBid:", error);

      // Handle specific error responses gracefully
      if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
      } else {
          toast.error("Internal Server Error");
      }
  }
};

  return (
    <div className="flex flex-col items-center justify-center ">
      {data ? (
      <div className="flex flex-col items-center gap-4 w-fit p-20 border-2 border-gray-300">
        {
          data.isActive && 
          <div className="text-green-500"
          >Order is Currently Accepting Bids</div>
        }
        {
          !data.isActive && 
          <div className="text-red-500"
          >Order is filled. Not accepting Bids</div>
        }
        <div className="flex flex-col gap-4">
          <img  src={data.coverPhoto} alt="" />
          <div className="flex gap-4">
            <img className="h-full w-1/3" src={data.firstPic} alt="" />
            <img className="h-full w-1/3" src={data.secondPic} alt="" />
            <img className="h-full w-1/3" src={data.thirdPic} alt="" />
          </div>
          <a href={data.landDocument} download className="text-blue-500">
            <img src={data.landDocument} alt="Land Document" className=""/>
          </a>
        </div>
        <p className="bold text-gray-800" >{data.crop}</p>
        <p >{data.area} Acres</p>
        <p >₹{data.price}</p>
        {
          data.isActive &&
            <div className="border-black">
              <div className="text-black ">Bids: </div>
              {
              data.bids && data.bids.length>0 ? 
                (
                  data.bids.map((bid) => (
                      bid.isActive && 
                      <div className="border-b-black flex flex-col flex-wrap">
                          <div>₹ {bid.price}</div>
                          <div className="text-sm">{bid.description}</div>
                          <button className="rounded text-white bg-gray-800 p-4 active:bg-gray-600" onClick={()=> AcceptBid(bid._id)} >Accept Bid</button>
                      </div>
                  ))
                ): 
                (<div className="text-lg ">No Bids Till now</div>)
              }
            </div>
        }
      </div>
      ): (<div>No order data available</div>)
    }

    <button onClick={() => deletOrder()}>Delete this Order</button>
    </div>
  );
};

const styles = {
  card: {
    width: "350px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "'Arial', sans-serif",
    margin: "20px",
  },
  coverPhoto: {
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.3)",
  },
  details: {
    padding: "20px",
    textAlign: "center",
  },
  cropName: {
    fontSize: "1.5rem",
    margin: "10px 0",
    color: "#333",
  },
  landArea: {
    fontSize: "1rem",
    margin: "5px 0",
    color: "#555",
  },
  price: {
    fontSize: "1.2rem",
    margin: "10px 0",
    color: "#4CAF50",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default OrderCardForFarmer;
