import { useLoaderData } from "react-router";


const DetailsPage = () => {
    const listing = useLoaderData();
    console.log(listing);
    return (
        <div>
            {
                <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={listing.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{listing.name}</h2>
                    <p>{listing.description}</p>
                    <div className="card-actions justify-end">
                        <span className="text-2xl font-bold">${listing.price.toFixed(2)}</span>
                    </div>
                </div>
                </div>
            }
        </div>
    );
};

export default DetailsPage;