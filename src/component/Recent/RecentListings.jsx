import { use } from 'react';

const RecentListings = ({ recentListing }) => {
    const recent=use(recentListing);
    console.log(recent);
    return (
        <div className='bg-gray-100 py-8'>
            <h2 className='text-center text-4xl'>Recent Products</h2>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4'>
            {
                recent.map((item) => (
     <div className="card bg-base-100 w-96 h-96 shadow-sm">
            <figure>
              <img src={item.image} alt={item.name} />
            </figure>
            <div className="card-body">   

            <div className="w-full flex items-center justify-between">
            <h2 className="text-lg font-bold"> {item.name}</h2>
            <span className="bg-green-600 p-1 rounded-lg text-white font-semibold">{item.price} BDT</span>
          </div>

              <div className="w-full gap-4 flex items-center justify-between">
                <h2>{item.category}</h2>
                <span>{item.location}</span>
              </div>

              <p>{item.description}</p>

              <button className="btn btn-primary">See Details</button>
            </div>
            
          </div>
                ))
            }
        </div>
        </div>
    );
};

export default RecentListings;