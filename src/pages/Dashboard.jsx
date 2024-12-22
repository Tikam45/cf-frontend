import React, { useState, useEffect } from "react";
import FarmerDashboard from "../components/FarmerDashborad";
import BuyerDashboard from "../components/BuyerDashboard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUserOrdersBidsAndDeals } from "../operations/GetOrders";
import DealsDashBoard from "../components/DealsDashBoard";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [bids, setBids] = useState([]);
  const [deals, setDeals] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [count, setCount] = useState(1);

  async function getData() {
    try {
      const res = await getUserOrdersBidsAndDeals({ token });
      console.log(res);
      if (res && res.data) {
        setOrders(res.data.orders);
        setBids(res.data.bids);
        setDeals(res.data.deals);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [count]);
  // background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
  return (
    <div className="bg-gradient-to-t from-[#E3FDF5] to-[#FFE6Fa]  mt-8 text-[1.5rem]">

      {token == null ? (
        <div className="text-center">
          Register first to access Dashboard
        </div>
      ) : (
        <div>
          <h1 className="mt-3 text-center text-[1.8rem] font-bold text-blue-500 ">Welcome to Your Dashboard</h1>
          <div className="m-7 flex flex-col gap-16">
            {/* Orders Section */}
            <div className="border-b-2 border-black pb-6">
              <FarmerDashboard orders={orders} setCount={setCount} />
            </div>

            {/* Bids Section */}
            <div className="border-b-2 border-black pb-6">
              <BuyerDashboard bids={bids} setCount={setCount} />
            </div>

            {/* Deals Section */}
            <div className="border-b-2 border-black pb-6">
              <DealsDashBoard deals={deals} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
