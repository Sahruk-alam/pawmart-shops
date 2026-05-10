import { use } from 'react';

const RecentListings = ({ recentListing }) => {
    const recent=use(recentListing);
    console.log(recent);
    return (
        <div className='bg-gray-100 py-8'>
            <h2 className='text-center text-4xl'>Recent Products</h2>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
            {
                recent.map((item) => (
                    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={item.image}
      alt={item.name} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
                ))
            }
        </div>
        </div>
    );
};

export default RecentListings;