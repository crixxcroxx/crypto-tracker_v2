import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import parse from "html-react-parser";

import { Button } from "react-bootstrap";

import { db } from "../../firebase";
import { useUserAuth } from "../../context/userContext";
import { toCommaFormat } from "../../utils/toCommaFormat";

import "./coinInfoAside.css";

const CoinInfoAside = ({ coinInfo }) => {
  const [coins, setCoins] = useState([]);
  const { user, handleAdd, handleDelete } = useUserAuth();

  useEffect(
    () =>
      onSnapshot(collection(db, `${user && user.uid}`), (snapshot) => {
        setCoins(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  return (
    <div className="coin-info-aside">
      {Object.keys(coinInfo).length > 0 && (
        <>
          <img src={coinInfo.image.large} alt={coinInfo.name} />
          <h3>{coinInfo.name}</h3>
          <p>{parse(coinInfo.description.en.split(". ")[0])}.</p>

          <div>
            <p>
              <strong>Rank:</strong> <span>{coinInfo.market_cap_rank}</span>
            </p>
            <p>
              <strong>Current Price:</strong>{" "}
              <span>
                USD {toCommaFormat(coinInfo.market_data.current_price.usd)}
              </span>
            </p>
            <p>
              <strong>Market Cap:</strong>{" "}
              <span>
                USD {toCommaFormat(coinInfo.market_data.market_cap.usd)}
              </span>
            </p>
          </div>
          {(user && coins.find((coin) => coin.name === coinInfo.name) && (
            <Button
              variant="danger"
              onClick={() =>
                handleDelete(
                  coins.find((coin) => coin.name === coinInfo.name).id
                )
              }
            >
              Remove from Watch List
            </Button>
          )) ||
            (user &&
              (coins.find((coin) => coin.name !== coinInfo.name) ||
                coins.length === 0) && (
                <Button
                  variant="primary"
                  onClick={() =>
                    handleAdd(
                      coinInfo.name,
                      coinInfo.market_data.current_price.usd
                    )
                  }
                >
                  Add to Watch List
                </Button>
              ))}
        </>
      )}
    </div>
  );
};

export default CoinInfoAside;
