import { useState } from 'react'
import { Routes, Router, Route } from "react-router-dom";
import './App.css'
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './pages/VerificationPage';
import CropForm from './pages/CreateOrder';
import OrderCardForFarmer from './components/FarmerOrderDetail';
import OrderCard from './components/OrderCard';
import OrderDetails from './components/OrderDetails';
import Navbar from './components/navbar';
import ProfileDashboard from './components/ProfilePage';
import BidsDetails from './components/BidsDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Marketplace/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/createOrder" element={<CropForm/>} />
        <Route path="/orderDetails" element={<OrderCardForFarmer/>} />
        <Route path="/order/:orderId" element={<OrderDetails/>} />

        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />

        <Route path="/profile" element={<ProfileDashboard/>}/>
      </Routes>
    </div>
  )
}

export default App;
