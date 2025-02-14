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
import ResetPassword from './pages/ResetPassword';
import PasswordChangeForm from './components/PasswordChangeForm';
import ForgetPassword from './pages/ForgetPassword';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col gap-24'>
      <div className=''>
      <Navbar className =""/>
      </div>
      <div className="">
      <Routes >
        <Route path="/" element = {<Marketplace/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/createOrder" element={<CropForm/>} />
        <Route path="/orderDetails" element={<OrderCardForFarmer/>} />
        <Route path="/order/:orderId" element={<OrderDetails/>} />

        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />

        <Route path="/profile" element={<ProfileDashboard/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path='/change-password-form' element={<PasswordChangeForm/>} />
        <Route path='/forgotPassword' element={<ForgetPassword/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App;
