import { useState } from "react";
import { Link, useLoaderData } from "react-router";

const PetsSupplies = () => {
  const listings = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter listings based on selected category
  const filteredListings = selectedCategory
    ? listings.filter((item) => item.category === selectedCategory)
    : listings;

  return (
    <div>
      <h2 className="text-center mt-5 font-bold text-2xl">
        {filteredListings.length} Listings
      </h2>

      <div className="w-full flex justify-end mt-4 px-4">
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-50 border bg-white rounded-lg p-3"
        >
          <option value="">All Categories</option>
          <option value="Pets">Pets</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Pet Care Products">Pet Care Products</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 py-4 mt-2">
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
