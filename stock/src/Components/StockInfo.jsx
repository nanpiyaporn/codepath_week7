import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY2 = import.meta.env.VITE_APP_API_KEY2;

const StockInfo = ({ symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY2}`
        );
        const json = await response.json();
        const timeSeries = json['Time Series (5min)'];
        const latestTime = Object.keys(timeSeries)[0];
        setPrice(timeSeries[latestTime]['4. close']);
      } catch (error) {
        console.error("Error fetching stock price:", error);
        // Handle error
      }
    };

    getPrice();
  }, [symbol]);

  return (
    <div>
      <Link
        style={{ color: "White" }}
        to={`/stockDetails/${symbol}`}
        key={symbol}
      >
        {symbol} <span className="tab"></span> ${price} USD
      </Link>
    </div>
  );
};

export default StockInfo;