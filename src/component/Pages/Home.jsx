import Slider from "../Animation/Slider";
import Category from "../Category/Category";
import ExtraSection from "../ExtraPage/ExtraSection";
import RecentListings from "../Recent/RecentListings";
import usePageTitle from "../../hooks/usePageTitle";

const recentListing = fetch("http://localhost:3000/recent-listings").then(
  (res) => res.json(),
);
const Home = () => {
  usePageTitle("Home");

  return (
    <div className="">
      <Slider></Slider>
      <Category></Category>
      <RecentListings recentListing={recentListing} />
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default Home;
