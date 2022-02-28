import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CoinInfoAside from "../../components/coinInfoAside/CoinInfoAside";
import CoinInfoChart from "../../components/coinInfoChart/CoinInfoChart";

import { SingleCoin } from "../../config/api";

import "./coin-info.css";

const CoinInfo = () => {
  const [coinInfo, setInfo] = useState({});
  const params = useParams();

  const fetchData = async () => {
    const { data } = await axios
      .get(SingleCoin(params.id))
      .catch((err) => console.error(err));

    setInfo(data);
  };

  useEffect(() => {
    fetchData();

    return () => setInfo({});
  }, []);

  return (
    <Container className="coin-info">
      {Object.keys(coinInfo).length > 0 && (
        <Row>
          <Col md={5} lg={4}>
            <CoinInfoAside coinInfo={coinInfo} />
          </Col>

          <Col md={7} lg={8}>
            <CoinInfoChart id={coinInfo.id} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CoinInfo;
