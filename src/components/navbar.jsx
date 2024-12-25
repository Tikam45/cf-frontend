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


  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <BiSolidFoodMenu className=""/>
      <h1 className="bold text-3xl">Contract Farming</h1>
      <div >
        <div className="flex space-x-4">
        {token == null && <Link to="/login">Login</Link>}
        {token == null && <Link to="/signup">Signup</Link>}
        </div>
        {user && (
          <div
            className="flex items-center"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <img
              src={user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div style={styles.dropdownMenu}>
              <Link to="/dashboard" className="">
                Dashboard
              </Link>
              <Link to="/profile" className="">
                Profile
              </Link>
              <Link to="/settings" >
                Settings
              </Link>
              <button className="" onClick={handleLogout}>
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
