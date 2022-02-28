import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

import { HistoricalChart } from "../../config/api";

import "./coinInfoChart.css";

const CoinInfoChart = ({ id }) => {
  Chart.register(...registerables);
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(30);

  const fetchData = async () => {
    const { data } = await axios
      .get(HistoricalChart(id, "usd"))
      .catch((err) => console.error(err));

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchData();

    return () => setHistoricalData([]);
  }, [days]);

  return (
    <div className="coin-info-chart ">
      {historicalData.length > 0 && (
        <Line
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price in past ${days} day(s) in USD`,
                fill: false,
                borderWidth: 1,
                borderColor: "#ffd700",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
            maintainAspectRatio: false,
          }}
        />
      )}
    </div>
  );
};

export default CoinInfoChart;
