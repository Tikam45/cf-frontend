import React from "react";

const BidsDetails = () => {
  const styles = {
    container: {
      width: "300px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
      margin: "20px auto",
    },
    price: {
      fontSize: "1.5rem",
      color: "#333",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    acceptButton: {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
    acceptButtonHover: {
      backgroundColor: "#45a049",
    },
    declineButton: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
    declineButtonHover: {
      backgroundColor: "#d32f2f",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.price}>Price: ₹50,000</div>
      <div style={styles.buttonsContainer}>
        <button
          style={{
            ...styles.button,
            ...styles.acceptButton,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Accept
        </button>
        <button
          style={{
            ...styles.button,
            ...styles.declineButton,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#d32f2f")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#f44336")}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default BidsDetails;
