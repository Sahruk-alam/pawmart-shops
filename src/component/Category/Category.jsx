// import React from 'react';

const Category = () => {
    return (

       <div className="my-6 ">
        <h2 className="text-center py-3 font-bold text-xl md:text-2xl">Categories</h2>
        
<div className="flex flex-col md:flex-row gap-2 justify-center items-center text-center">

    <div className="card transition-transform duration-300 hover:scale-105 bg-neutral-700 text-neutral-content w-70">
     <div className="card-body items-center text-center">
     <h2 className="card-title">🐶Pets</h2>
     <p>Give loving pets a forever home</p>
    
     </div>
    </div>

     <div className="card transition-transform duration-300 hover:scale-105 bg-neutral-700 text-neutral-content w-70">
     <div className="card-body items-center text-center">
     <h2 className="card-title"> 🍖Pet Food </h2>
     <p>Healthy meals for happy pets</p>
     </div>
    </div>

         <div className="card transition-transform duration-300 hover:scale-105 bg-neutral-700 text-neutral-content w-70">
     <div className="card-body items-center text-center">
     <h2 className="card-title">🦴Accessories </h2>
     <p>Stylish and fun pet essentials</p>
    
     </div>
    </div>

     <div className="card transition-transform duration-300 hover:scale-105 bg-neutral-700 text-neutral-content w-70">
     <div className="card-body items-center text-center">
     <h2 className="card-title"> 🩺Pet Care Products</h2>
     <p>Everything needed for pet wellness.</p>
    
     </div>
    </div>
       </div>

        </div>
       
    );
};

export default Category;