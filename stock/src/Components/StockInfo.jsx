import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const API_KEY2 = import.meta.env.VITE_APP_API_KEY2;

const StockInfo = ({ symbol: initialSymbol }) => {
  const [price, setPrice] = useState(null);
  const [symbol, setSymbol] = useState(initialSymbol);

const [inputValue, setInputValue] = useState("");


  StockInfo.propTypes = {
    symbol: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const getPrice = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY2}`
        );
        const json = await response.json();
        const timeSeries = json['Time Series (5min)'];
        if (timeSeries) {
          const latestTime = Object.keys(timeSeries)[0];
          setPrice(timeSeries[latestTime]['4. close']);
        }
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };

    getPrice();
  }, [symbol]);

  return (
    <div>
       <input
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={() => setSymbol(inputValue)}>
      Search
      </button>
      {price !== null ? (
        <Link
          style={{ color: "Black" }}
          to={`/stockDetails/${symbol}`}
          key={symbol}
        >
          {symbol} <span className="tab"></span> ${price} USD
        </Link>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StockInfo;