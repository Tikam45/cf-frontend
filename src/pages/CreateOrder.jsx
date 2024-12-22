import React, { useState } from "react";
import { createOrder } from "../operations/CreateOrder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const reader = new FileReader();

const CropForm = () => {
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState("");
    const {token} = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    coverPhoto: null,
    firstPic: null,
    secondPic: null,
    thirdPic: null,
    price: "",
    landDocument: null,
  });
  
  // function previewFile(file, name) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     const fileUrl = reader.result;
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: fileUrl,
  //     }));
  //     console.log(`${name} preview URL:`, fileUrl);
  //     console.log(formData);
  //   };
  // }

  // const [coverPhotoImage ,setCoverPhotoImage] = useState("");
  // const [firstPicImage ,setFirstPicImage] = useState("");
  // const [secondPicImage ,setSecondPicImage] = useState("");
  // const [thirdPicImage ,setThirdPicImage] = useState("");

  const handleChange =  (e) => {
    const { name, value, files } = e.target;
    // let imgUrl = "";
    // if(files){
    //   console.log("name", name);
    //   previewFile(files[0], name);
    // }
    console.log('hi');
    setFormData({
      ...formData,
      [name]: files? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating Order");
    const formDataToSend = new FormData();
    
    // Append all fields to FormData
    formDataToSend.append("crop", formData.crop);
    formDataToSend.append("area", formData.area);
    formDataToSend.append("price", formData.price);
  
    // Append file fields to FormData
    formDataToSend.append("coverPhoto", formData.coverPhoto);
    formDataToSend.append("firstPic", formData.firstPic);
    formDataToSend.append("secondPic", formData.secondPic);
    formDataToSend.append("thirdPic", formData.thirdPic);
    formDataToSend.append("landDocument", formData.landDocument);
  
    try {
      const response = await createOrder(formDataToSend, token);
      console.log("Order created successfully:", response);
      // Navigate to dashboard after successful submission
      toast.dismiss(toastId);
      if(response?.data?.success)
        toast.success("Order created Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.dismiss(toastId);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#34495e", // Dark blue-gray for heading
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    label: {
      fontSize: "16px",
      color: "#555",
      fontWeight: "500",
      marginBottom: "5px",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginTop: "5px",
      backgroundColor: "#f9f9f9",
      color: "#333",
    },
    fileInput: {
      padding: "5px",
    },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      color: "white",
      backgroundColor: "#3498db", // Light blue
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      fontWeight: "600",
    },
    buttonHover: {
      backgroundColor: "#2980b9", // Darker blue for hover
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit} enctype="">
        <h2 style={styles.heading}>Crop Details</h2>

        <label style={styles.label}>
          Crop Name:
          <input
            type="text"
            name="crop"
            value={formData.cropName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Land Area (in acres):
          <input
            type="number"
            name="area"
            value={formData.landArea}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Cover Photo:
          <input
            type="file"
            name="coverPhoto"
            accept="image/png image/jpeg image/jpg"
            onChange={handleChange}
            style={styles.fileInput}
            required
          />
        </label>

        <label style={styles.label}>
          First Picture:
          <input
            type="file"
            name="firstPic"
            accept="image/png image/jpeg image/jpg"
            onChange={handleChange}
            style={styles.fileInput}
          />
        </label>

        <label style={styles.label}>
          Second Picture:
          <input
            type="file"
            name="secondPic"
            accept="image/png image/jpeg image/jpg"
            onChange={handleChange}
            style={styles.fileInput}
          />
        </label>

        <label style={styles.label}>
          Third Picture:
          <input
            type="file"
            name="thirdPic"
            accept="image/png image/jpeg image/jpg"
            onChange={handleChange}
            style={styles.fileInput}
          />
        </label>

        <label style={styles.label}>
          Price (₹):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Land Document:
          <input
            type="file"
            name="landDocument"
            accept="image/png image/jpeg image/jpg"
            onChange={handleChange}
            style={styles.fileInput}
            required
          />
        </label>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CropForm;
