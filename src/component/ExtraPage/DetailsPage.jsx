import { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import OrderModal from "./OrderModal";
import usePageTitle from "../../hooks/usePageTitle";
import { fireThemedAlert } from "../../utils/themedAlert";

const DetailsPage = () => {
  const listing = useLoaderData();
  usePageTitle(`${listing?.name || "Details"}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in, if not redirect to login
  useEffect(() => {
    if (!user) {
      fireThemedAlert({
        title: "Please Login",
        text: "You need to login to view this page",
        icon: "warning",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, navigate]);

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
        fireThemedAlert({
          title: "Success",
          text: "Order Confirmed Successfully!",
          icon: "success",
        });
        setIsModalOpen(false);
      } else {
        fireThemedAlert({
          title: "Error!",
          text: "Failed to place order.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      fireThemedAlert({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <div className="min-h-screen  flex items-center justify-center transition-colors duration-300">
          <p className="text-lg ">Redirecting to login...</p>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center transition-colors duration-300 px-4 py-10">
          <div className="card bg-base-100 text-base-content w-96 h-96 shadow-sm border border-base-300">
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
              <p className="text-center text-base-content/80">
                {listing.email}
              </p>

              <button
                className="btn btn-primary text-primary-content"
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
      )}
    </>
  );
};

export default DetailsPage;
