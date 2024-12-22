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

    const styles = {
        container: {
            padding: "20px",
            maxWidth: "800px",
            margin: "0 auto",
        },
        orderStatus: {
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
        },
        orderStatusActive: {
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
        },
        orderStatusInactive: {
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
        },
        imagesContainer: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
        },
        image: {
            width: "100%",
            maxWidth: "180px",
            height: "auto",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        form: {
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
        },
        input: {
            width: "calc(100% - 20px)",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
        },
        button: {
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        noData: {
            textAlign: "center",
            color: "#777",
            fontSize: "20px",
            marginTop: "50px",
        },
        
    };

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
                toast.success("Bid Created Successfully");
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
        <div style={styles.container}>
            {data ? (
                <div>
                    {data.isActive && (
                        <div style={{ ...styles.orderStatus, ...styles.orderStatusActive }}>
                            Order is Currently Accepting Bids
                        </div>
                    )}
                    {!data.isActive && (
                        <div style={{ ...styles.orderStatus, ...styles.orderStatusInactive }}>
                            Order is filled. Not accepting Bids
                        </div>
                    )}
                    <div className="images-container">
                        <img src={data.coverPhoto} alt="Cover Photo" className="cover-photo" />
                        <img src={data.firstPic}  className="small-image" />
                        <img src={data.secondPic}  className="small-image" />
                        <img src={data.thirdPic} className="small-image" />
                        <a href={data.landDocument} download className="land-document">
                            <img src={data.landDocument} alt="Land Document" />
                        </a>
                    </div>

                    <h3>{data.crop}</h3>
                    <p>{data.area} Acres</p>
                    <p>₹{data.price}</p>
                    {data.isActive && (
                        <button
                            style={styles.button}
                            onClick={() => setShowBidForm(!showBidForm)}
                        >
                            Create Bid
                        </button>
                    )}

                    {showBidForm && (
                        <form style={styles.form} onSubmit={BidCreation}>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter your desired Price"
                                onChange={handleFormChange}
                                value={formData.price}
                                style={styles.input}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Message You want to convey..."
                                onChange={handleFormChange}
                                value={formData.description}
                                style={styles.input}
                                required
                            />
                            <button type="submit" style={styles.button}>
                                Add Bid
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <div style={styles.noData}>No order data available</div>
            )}
        </div>
    );
};

export default OrderDetails;
