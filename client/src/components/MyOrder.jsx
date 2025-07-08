import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import OrderCard from "./OrderCard";

const MyOrder = () => {
  const { user } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`)
      .then((data) => {
        console.log(data?.data);
        setOrders(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 py-12'>
        {/* Coffee Cards */}
        {
          orders.map(coffee => (
            <OrderCard key={coffee._id} coffee={coffee}/>
          ))
        }
      </div>
    </div>
  );
};

export default MyOrder;
