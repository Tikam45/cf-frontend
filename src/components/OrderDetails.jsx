import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../operations/GetOrders";
import { useSelector } from "react-redux";
import { createBid } from "../operations/Bids";
import toast from "react-hot-toast";

const OrderDetails = () => {
    const { orderId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [data, setData] = useState(null);
    const [showBidForm, setShowBidForm] = useState(false);
    const [formData, setFormData] = useState({ price: "", description: "" });


    const handleFormChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const BidCreation = async (e) => {
        e.preventDefault();
        try {
            const result = await createBid({
                orderId,
                price: formData.price,
                description: formData.description,
                token,
            });

            if (result?.data?.success) {
                // toast.success("Bid Created Successfully");
                setShowBidForm(false);
                setData(data.order);
            }
        } catch (error) {
            toast.error("An unexpected Error Occurred");
        }
    };

    const getDetails = async () => {
        try {
            const response = await getOrderDetails(orderId);
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetails();
    }, [orderId]);

    return (
        <div className="flex flex-col items-center justify-center ">
            {data ? (
                <div className="flex flex-col items-center gap-4 w-fit p-20 border-2 border-gray-300">
                    {data.isActive && (
                        <div className="text-green-500">
                            Order is Currently Accepting Bids
                        </div>
                    )}
                    {!data.isActive && (
                        <div className="text-red-500">
                            Order is filled. Not accepting Bids
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <img src={data.coverPhoto} alt="Cover Photo" className="" />
                        <div className="flex  gap-4">
                            <img className="h-full w-1/3" src={data.firstPic} />
                            <img className="h-full w-1/3" src={data.secondPic}   />
                            <img className="h-full w-1/3" src={data.thirdPic}  />
                        </div>
                        <a href={data.landDocument} download className="text-blue-500">
                            <img src={data.landDocument} alt="Land Document" className=""/>
                        </a>
                    </div>

                    <p className="bold text-gray-800">{data.crop}</p>
                    <p>{data.area} Acres</p>
                    <p>₹{data.price}</p>
                    {data.isActive && (
                        <button
                            className="w-fit p-3 text-white bg-gray-900 rounded hover:bg-gray-500 "
                            onClick={() => setShowBidForm(!showBidForm)}
                        >
                            Create Bid
                        </button>
                    )}

                    {showBidForm && (
                        <form  onSubmit={BidCreation} className="flex flex-col gap-3 justify-center items-center">
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter your desired Price"
                                onChange={handleFormChange}
                                value={formData.price}
                                required
                                className="w-fit border-2 border-gray-300 p-2"
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Message You want to convey..."
                                onChange={handleFormChange}
                                value={formData.description}
                                required
                                className="w-fit border-2 border-gray-300 p-2"
                            />
                            <button type="submit" className="w-fit p-3 text-white bg-gray-900 rounded hover:bg-gray-500 ">
                                Add Bid
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <div className="">No order data available</div>
            )}
        </div>
    );
};

export default OrderDetails;
