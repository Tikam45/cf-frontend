import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = (data) => {
  data = data.data;
  console.log("hi" , data);
  const navigate = useNavigate();
  const getDetails = () => {
    navigate(`/order/${data._id}`);
  }
  return (
    <div style={styles.card}>
      <div style={{ ...styles.coverPhoto, backgroundImage: `url(${data.coverPhoto})` }}>
        <div style={styles.overlay}></div>
      </div>

      <div style={styles.details}>
        <h3 style={styles.cropName}>{data.crop}</h3>
        <p style={styles.landArea}>{data.area} Acres</p>
        <p style={styles.price}>₹{data.price}</p>
        <button style={styles.button} onClick={()=>getDetails()}>View Details</button>
      </div>
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

export default OrderCard;
