import axios from "axios";
import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { CryptoList } from "../../config/api/";

import "./coinList.css";

const CoinList = ({ search }) => {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data } = await axios
      .get(CryptoList("usd"))
      .catch((err) => console.error(err));

    setCoins(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="coin-list">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24hr Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.length > 0 &&
            coins
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(search.toLowerCase()) ||
                  val.symbol.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((coin) => (
                <tr key={coin.id} onClick={() => navigate(`coins/${coin.id}`)}>
                  <td>
                    <div>
                      <img src={coin.image} alt={coin.name} />
                      {coin.name}
                    </div>
                  </td>
                  <td>USD {coin.current_price.toFixed(2)}</td>
                  <td
                    className={
                      coin.price_change_24h >= 0 ? "increase" : "decrease"
                    }
                  >
                    {coin.price_change_24h.toFixed(2)}%
                  </td>
                  <td>USD {coin.market_cap}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CoinList;
