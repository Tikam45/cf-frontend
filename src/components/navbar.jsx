import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidFoodMenu } from "react-icons/bi";
import { logout } from "../operations/Profile";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  let hideTimeout;

  // Handlers for showing and hiding the dropdown
  const showDropdown = () => {
    clearTimeout(hideTimeout); // Cancel any pending hide timeout
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    hideTimeout = setTimeout(() => {
      setDropdownVisible(false);
    }, 300); // Delay of 300ms
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  }

  // Inline styles
  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "3px 7px",
      margin: "0.5rem",
      backgroundColor: "#f8f9fa",
      width: "97vw",
      position: "static",
      top: "7px"
    },
    menuIcon: {
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "black",
    },
    navOptions: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    profileContainer: {
      position: "relative",
    },
    profilePic: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      cursor: "pointer",
    },
    dropdownMenu: {
      position: "absolute",
      top: "50px",
      right: "0",
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      display: isDropdownVisible ? "flex" : "none",
      flexDirection: "column",
      padding: "10px",
      zIndex: 10,
    },
    dropdownLink: {
      textDecoration: "none",
      color: "black",
      padding: "8px 12px",
      borderRadius: "3px",
      transition: "background-color 0.2s",
    },
    logoutBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      width: "100%",
      fontSize: "14px",
    },
    heading: {
        color: "black",
    }
  };

  return (
    <div style={styles.navbar}>
      <BiSolidFoodMenu style={styles.menuIcon} />
      <h1 style={styles.heading}>Contract Farming</h1>
      <div style={styles.navOptions}>
        {token == null && <Link to="/login">Login</Link>}
        {token == null && <Link to="/signup">Signup</Link>}
        {user && (
          <div
            style={styles.profileContainer}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <img
              src={user.image}
              alt="Profile"
              style={styles.profilePic}
            />
            <div style={styles.dropdownMenu}>
              <Link to="/dashboard" style={styles.dropdownLink}>
                Dashboard
              </Link>
              <Link to="/profile" style={styles.dropdownLink}>
                Profile
              </Link>
              <Link to="/settings" style={styles.dropdownLink}>
                Settings
              </Link>
              <button style={{ ...styles.dropdownLink, ...styles.logoutBtn }} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
