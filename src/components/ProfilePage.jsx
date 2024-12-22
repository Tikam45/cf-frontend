import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, sendOtpMessage, updateImage, verifyOtpMessage } from "../operations/Profile";
import toast from "react-hot-toast";
import { setUser } from "../slices/ProfileSlice";

const ProfileDashboard = ({ firstName, lastName, email, mobileNo, profilePic }) => {
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [mobile, setMobile] = useState(null);
  const [inputMob, setInputMob] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const getInfo = async () => {
    try {
      const response = await getUserDetails({ token });
      setData(response.data.user);
      setMobile(response.data.user.mobileNo);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch user details");
    }
  };

  useEffect(() => {
    getInfo();
  }, [count]);

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendOtpMessage({ token, mobile: inputMob });
      if (response.data.success) {
        setShowOtpInput(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtpMessage({ token, mobile: inputMob, otp });
      if (response.data.success) {
        toast.success(response.data.message);
        setShowOtpInput(false);
        setCount(count + 1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    const image = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);

      // const formDataToSend = new FormData();
      // formDataToSend.append("profilePic", image);
      // console.log("formDataToSend", formDataToSend, image);
      const result = await updateImage({token,profilePic: file});
      console.log("hi", result.data.user);
      if(result.data.success){
        toast.success(result.data.message);
        dispatch(setUser(result.data.user));
        localStorage.setItem("user", JSON.stringify(result.data.user))
    }
    else{
        toast.error(result.data.message);
    }
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
    },
    header: {
      marginBottom: "20px",
    },
    profilePic: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #007bff",
      cursor: "pointer",
    },
    name: {
      marginTop: "10px",
      fontSize: "1.5em",
      color: "#333",
    },
    details: {
      textAlign: "left",
    },
    detailItem: {
      fontSize: "1em",
      margin: "8px 0",
      color: "#555",
    },
    detailLabel: {
      color: "#000",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <label>
          <img
            src={selectedImage || data.image || "https://via.placeholder.com/150"}
            alt={`${data.firstName} ${data.lastName}`}
            style={styles.profilePic}
          />
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <h1 style={styles.name}>{`${data.firstName} ${data.lastName}`}</h1>
      </div>
      <div style={styles.details}>
        <p style={styles.detailItem}>
          <span style={styles.detailLabel}>Email:</span> {data.email}
        </p>
        <p style={styles.detailItem}>
          <span style={styles.detailLabel}>Mobile:</span> {mobile}
        </p>
        {mobile ? (
          <div></div>
        ) : (
          <div>
            <form onSubmit={handleMobileSubmit}>
              <label>Mobile Number:</label>
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                placeholder="Enter 10 digit mobile number"
                pattern="[0-9]{10}"
                onChange={(e) => setInputMob(e.target.value)}
                value={inputMob}
                required
              />
              <button type="submit">Send OTP</button>
            </form>
          </div>
        )}
        {showOtpInput && (
          <form onSubmit={handleOtpSubmit}>
            <label>Enter OTP:</label>
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
