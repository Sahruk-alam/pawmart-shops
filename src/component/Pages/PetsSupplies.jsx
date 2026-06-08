import { use, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import usePageTitle from "../../hooks/usePageTitle";

const PetsSupplies = () => {
  usePageTitle("Pets Supplies");
  const { loading } = use(AuthContext);
  const listings = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter listings based on selected category and search term
  const filteredListings = listings.filter((item) => {
    const matchCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-center font-bold text-2xl mb-6">
        {filteredListings.length} Listings
      </h2>

      {/* Category and Search Bar Layout */}
      <div className="flex justify-between gap-6 mb-8">

        {/* Left Side - Categories */}
        <div className="md:col-span-1">
          <div className="bg-base-100 rounded-lg p-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full  border-gray-300 rounded-lg px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="">All Categories</option>
              <option value="Pets">Pets</option>
              <option value="Pet Food">Pet Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Pet Care Products">Pet Care Products</option>
            </select>
          </div>
        </div>

        {/* Right Side - Search Bar */}
        <div className="md:col-span-2">
          <div className="bg-base-100 rounded-lg p-4">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
        {filteredListings.map((item) => (
          <div key={item._id} className="card bg-base-100 w-96 h-96 shadow-sm">
            <figure>
              <img src={item.image} alt={item.name} />
            </figure>
            <div className="card-body">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-lg font-bold"> {item.name}</h2>
                <span className="bg-green-600 p-1 rounded-lg text-white font-semibold">
                  {item.price} BDT
                </span>
              </div>

              <div className="w-full gap-4 flex items-center justify-between">
                <h2>{item.category}</h2>
                <span>{item.location}</span>
              </div>

              <p>{item.description}</p>

              <Link
                to={`/details-page/${item._id}`}
                className="btn btn-primary"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsSupplies;
