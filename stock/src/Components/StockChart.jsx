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
          <h2>Intraday Price Data for {symbol}</h2>
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


{/*import React, { Component, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";

const API_KEY2 = import.meta.env.VITE_APP_API_KEY2;

const StockChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);

    useEffect(() => {
      const getCoinHist = async () => {
        const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&tinterval=5min&apikey` +
            API_KEY2
        );
        
        const json = await response.json();
        setHistData(json.Data.Data);
      };
      getCoinHist().catch(console.error);
    }, [market, symbol]);

    const cleanData = (data) => {
      let filteredData = [];
      let countDays = 0;
      for (const item of data) {
        let accurateTime = new Date(item.time).toLocaleTimeString("en-US");
        let accurateDay = new Date();
        accurateDay.setDate(accurateDay.getDate()- countDays);
    
        filteredData.push({
          'time': accurateDay.toLocaleDateString("en-US") + " " + accurateTime,
          'open price': item.open,
        });
        countDays ++;
      }
    
      // data is given counting backwards, so return the reverse to have data ordered from oldest to newest for accurate plotting
      return filteredData.reverse();    
    };

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
            <div>
  <br></br>
  <h2>30-Day Price Data for {symbol}</h2>

  <LineChart
    width={1300}
    height={400}
    data={cleanData(histData)}
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
    <XAxis dataKey="time" interval={2} angle={20} dx={20}>
      <Label value="Date and Time" offset={0} position="insideBottom" />
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
            </div>
          ) : null}
        </div>
      );
    
  };

export default StockChart;
*/}