import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePageTitle from "../../hooks/usePageTitle";

const FilterCategory = () => {
  const { categoryName } = useParams();
  usePageTitle(categoryName);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/products/category/${encodeURIComponent(categoryName)}`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [categoryName]);

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 py-10 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center">{categoryName}</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div className="card bg-base-100 text-base-content w-96 h-96 shadow-sm border border-base-300">
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

                <button className="btn btn-primary text-primary-content">
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FilterCategory;
