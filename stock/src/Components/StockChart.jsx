import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts";
import PropTypes from 'prop-types';
const API_KEY2 = import.meta.env.VITE_APP_API_KEY2;

const StockChart = ({ symbol }) => {
  
  StockChart.propTypes = {
    symbol: PropTypes.string.isRequired,
  };
  const [histData, setHistData] = useState(null);
  useEffect(() => {
    const getStockHist = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY2}`
      );
      const json = await response.json();
      const timeSeries = json['Time Series (5min)'];
      if (timeSeries) {
        const cleanedData = cleanData(timeSeries);
        setHistData(cleanedData);
      }
    };
    getStockHist().catch(console.error);
  }, [symbol]);

  const cleanData = (data) => {
    return Object.keys(data).map((key) => ({
      time: key,
      'open price': parseFloat(data[key]['1. open']),
    })).reverse();
  };

  return (
    <div>
      {histData ? (
        <div>
          <h2> Price Data for {symbol}</h2>
          <LineChart
            width={1300}
            height={400}
            data={histData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <Line
              type="monotone"
              dataKey="open price"
              stroke="#8884d8"
              activeDot={{ r: 5 }}
            />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" interval={10} angle={-45} dx={-15}>
              <Label value="Time" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{
                value: "Price",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip />
          </LineChart>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StockChart;

