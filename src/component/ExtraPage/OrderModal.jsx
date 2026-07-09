import { useState } from "react";

const OrderModal = ({ listing, user, onClose, onSubmit, loading }) => {
  const [quantity, setQuantity] = useState(listing.category === "Pets" ? 1 : 1);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      buyerName: user?.displayName || "",
      email: user?.email || "",
      productId: listing._id,
      productName: listing.name,
      quantity: listing.category === "Pets" ? 1 : quantity,
      price: listing.price,
      totalPrice: listing.price * (listing.category === "Pets" ? 1 : quantity),
      address,
      date,
      phone,
      notes,
      category: listing.category,
      status: "pending",
      createdAt: new Date(),
    };

    onSubmit(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 text-base-content rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-base-300">
        {/* Header */}
        <div className="sticky top-0 bg-green-600 dark:bg-green-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {listing.category === "Pets" ? "Adoption Form" : "Order Form"}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl hover:bg-green-800 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Buyer Name */}
          <div>
            <label className="block mb-2 font-semibold ">
              Buyer Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 "
            />
          </div>

          {/* Product/Listing ID */}
          <div>
            <label className="block mb-2 font-semibold ">
              Product ID
            </label>
            <input
              type="text"
              value={listing._id}
              readOnly
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 0 font-mono text-sm"
            />
          </div>

          {/* Product/Listing Name */}
          <div>
            <label className="block mb-2 font-semibold ">
              Product Name
            </label>
            <input
              type="text"
              value={listing.name}
              readOnly
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 "
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 font-semibold ">
              Quantity {listing.category === "Pets" && "(Fixed for Pets)"}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                listing.category !== "Pets" &&
                setQuantity(parseInt(e.target.value) || 1)
              }
              readOnly={listing.category === "Pets"}
              className={`w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 ${
                listing.category === "Pets"
                  ? ""
                  : "bg-base-100"
              }`}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold ">
              Unit Price (BDT)
            </label>
            <input
              type="number"
              value={listing.price}
              readOnly
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 "
            />
          </div>

          <div className=" p-3 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <label className="block mb-2 font-medium">
              Total Price (BDT)
            </label>
            <div className="text-xl font-semibold ">
              {listing.price * (listing.category === "Pets" ? 1 : quantity)} BDT
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows="2"
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 bg-base-100 text-base-content"
              placeholder="Enter delivery address"
            ></textarea>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              {listing.category === "Pets" ? "Adoption Date" : "Pickup Date"} *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 bg-base-100 text-base-content"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 bg-base-100 text-base-content"
              placeholder="01700000000"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg p-3 bg-base-100 text-base-content"
              placeholder="Any special requests or notes (optional)"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading
                ? "Processing..."
                : listing.category === "Pets"
                  ? "Confirm Adoption"
                  : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
