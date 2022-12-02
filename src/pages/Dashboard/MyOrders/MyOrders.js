import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../../shared/Loading/Loading";

const MyOrders = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `https://rebook-server-nine.vercel.app/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 403) {
        toast.error("Please log in again.");
        logOut()
          .then((res) => {
            <Navigate to="/login" state={{ from: location }} replace />;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const data = await res.json();
      return data;
    },
  });
  isLoading && <Loading />;
  console.log(orders);
  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold text-secondary text-center my-3">
        You have {orders.length} {orders.length > 1 ? "orders" : "order"}
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              return (
                <tr key={order._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={order.image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{order.productName}</div>
                        <div className="text-sm opacity-50">{order.writer}</div>
                      </div>
                    </div>
                  </td>
                  <td>$ {order.price}</td>
                  <td>
                    {order?.paid ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <button className="btn btn-xs btn-secondary text-primary">
                        Pay
                      </button>
                    )}
                  </td>
                  <th>
                    <button className="btn btn-xs btn-error text-white">
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
