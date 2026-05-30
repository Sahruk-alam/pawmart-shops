import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyListing = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-listings?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => setListings(data))
        .catch((err) => console.error("Error fetching listings:", err));
    }
  }, [user?.email]);


  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/my-listings/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your listing has been deleted.",
                "success",
              );
              const remaining = listings.filter(
                (listing) => listing._id !== _id,
              );
              setListings(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (listing) => {
    setSelectedListing(listing);
    setFormData(listing);
    setIsModalOpen(true);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        location: formData.location,
        description: formData.description,
        image: formData.image,
        date: formData.date,
      };

      const res = await fetch(
        `http://localhost:3000/my-listings/${selectedListing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        },
      );

      const data = await res.json();

      if (
        data.acknowledged &&
        (data.modifiedCount > 0 || data.matchedCount > 0)
      ) {
        Swal.fire({
          title: "Success!",
          text: "Listing updated successfully.",
          icon: "success",
        });

        // Update local state with all field updates
        const updatedListings = listings.map((listing) =>
          listing._id === selectedListing._id
            ? { ...listing, ...updateData }
            : listing,
        );
        setListings(updatedListings);
        setIsModalOpen(false);
        setSelectedListing(null);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update listing.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl bg-gray-100 mx-auto p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">My Listings</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td>{listing.name}</td>
                <td>{listing.category}</td>
                <td>৳{listing.price}</td>
                <td>{listing.location}</td>

                <td className="space-x-2">
                  {/* Update Button */}
                  <button
                    onClick={() => handleUpdate(listing)}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Update
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[70vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Listing</h2>

            <form onSubmit={handleSubmitUpdate} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-semibold mb-2">
                  Product/Pet Name{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg p-3"
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
                <label className="block font-semibold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block font-semibold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Pick Up Date */}
              <div>
                <label className="block font-semibold mb-2">Pick Up Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? "Updating..." : "Update Listing"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedListing(null);
                  }}
                  className="flex-1 bg-red-400 text-white py-3 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListing;
