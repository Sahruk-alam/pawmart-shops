import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import OrderModal from "./OrderModal";
import Swal from "sweetalert2";

const DetailsPage = () => {
  const listing = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = async (orderData) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.insertedId) {
            Swal.fire({
          title: "Success",
          text: "Order Confirmed Successfully!",
          icon: "success",
        });
        setIsModalOpen(false);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to place order.",
          icon: "error"
        });
      }
    } catch (error) {
      console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error"
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="card bg-base-100 w-96 h-96 shadow-sm">
        <figure>
          <img src={listing.image} alt={listing.name} />
        </figure>
        <div className="card-body">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-lg font-bold"> {listing.name}</h2>
            <span className="bg-green-600 p-1 rounded-lg text-white font-semibold">
              {listing.price} BDT
            </span>
          </div>

          <div className="w-full gap-4 flex items-center justify-between">
            <h2>{listing.category}</h2>
            <span>{listing.location}</span>
          </div>

          <p>{listing.description}</p>
          <p className="text-center">{listing.email}</p>

          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            {listing.category === "Pets" ? "Adopt Now" : "Order Now"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <OrderModal
          listing={listing}
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleOrderSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default DetailsPage;
