import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../../shared/Loading/Loading";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const [deletingBuyer, setDeletingBuyer] = useState(null);

  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `https://rebook-server-nine.vercel.app/users?email=${user?.emial}&role=buyer`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
  });

  // delet a buyer
  const handleDelet = (id) => {
    fetch(`https://rebook-server-nine.vercel.app/users/${id}?email=${user?.email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          refetch();
        }
      });
  };

  const closeModal = () => {
    setDeletingBuyer(null);
  };

  isLoading && <Loading />;

  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold text-center text-secondary my-3">
        {buyers.length} {buyers.length > 1 ? "Buyers" : "Buyer"} Found.
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => {
              return (
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-semibld">{buyer.name}</h2>
                    </div>
                  </td>
                  <td>{buyer?.email}</td>
                  <th>
                    <label
                      onClick={() => setDeletingBuyer(buyer)}
                      htmlFor="confirmationModal"
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </label>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {deletingBuyer && (
        <ConfirmationModal
          title="Are you sure you want to delete?"
          message={`If you delete ${deletingBuyer.name} it cannot be undone.`}
          closeModal={closeModal}
          successAction={handleDelet}
          successButtonName="Delete"
          modalData={deletingBuyer}
        />
      )}
    </div>
  );
};

export default AllBuyers;
