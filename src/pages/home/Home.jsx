import Banner from "../../components/banner/Banner";
import CoinList from "../../components/coinList/CoinList";

import "./home.css";

const Home = ({ search }) => {
  return (
    <div className="home">
      <Banner />
      <CoinList search={search} />
    </div>
  );
};

export default Home;
