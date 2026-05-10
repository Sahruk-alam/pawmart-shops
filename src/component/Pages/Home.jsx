import Slider from "../Animation/Slider";
import Category from "../Category/Category";
import RecentListings from "../Recent/RecentListings";
const recentListing = fetch(
  "http://localhost:3000/recent-listings",
).then((res) => res.json());
const Home = () => {
  return (
    <div className="">
      <Slider></Slider>
      <Category></Category>
      <RecentListings recentListing={recentListing} />
    </div>
  );
};

export default Home;
