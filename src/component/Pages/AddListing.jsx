import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const category = form.category.value;
    const listingData = {
      name: form.name.value,
      category,
      price: category === "Pets" ? 0 : parseFloat(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user?.email,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      });

      const data = await res.json();
console.log(data);
      if (data.insertedId) {
        Swal.fire({
  title: "Success",
  text: "Product Added Successfully!",
  icon: "success",
});
        form.reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add listing.",
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-2xl my-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Add New Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product/Pet Name */}
        <div>
          <label className="block mb-1 font-medium">Product/Pet Name</label>
          <input 
            type="text"
            name="name"
            required
            className="w-full border bg-white rounded-lg p-3"
            placeholder="Enter name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            required
            className="w-full border bg-white rounded-lg p-3"
          >
            <option value="">Select Category</option>
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Pet Care Products</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            min="0"
            className="w-full border bg-white rounded-lg p-3"
            placeholder="0 for Pets"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border bg-white rounded-lg p-3"
            placeholder="Dhaka"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="w-full border bg-white rounded-lg p-3"
            placeholder="Write details..."
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            required
            className="w-full border bg-white rounded-lg p-3"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Pick Up Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full border bg-white rounded-lg p-3"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border bg-white rounded-lg p-3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddListing;