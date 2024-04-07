import React, { useEffect, useState } from 'react';
import CoinInfo from './Components/CoinInfo';
import Stock from './Components/Stock';

import './App.css';


function App() {
 
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
const [searchInput, setSearchInput] = useState("");

// Function to search for items
const searchItems = searchValue => {
  setSearchInput(searchValue);
  if (searchValue !== "") {
    const filteredData = Object.keys(list.Data).filter((item) => 
      Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    setFilteredResults(filteredData);
  } else {
    setFilteredResults(Object.keys(list.Data));
  }
};


  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          'https://min-api.cryptocompare.com/data/all/coinlist?&api_key=' + API_KEY
        );
        const json = await response.json();
        setList(json);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };
    fetchAllCoinData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <h1>My Stock and Crypto List</h1>
      <br/>
      <Stock/>
    
      <h2>Crypto List</h2>
      <input
       type="text"
       placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}

/>
        {/* <input
       type="text"
       placeholder="Search..."
        onChange={(inputStringS) => searchItems(inputStringS.target.value)}
        /> */}
      <ul>
        {searchInput.length > 0
          ? filteredResults.map((coin) => 
            list.Data[coin].PlatformType === "blockchain" ? 
          <CoinInfo
          image={list.Data[coin].ImageUrl}
          name={list.Data[coin].FullName}
          symbol={list.Data[coin].Symbol}
           />
          : null
          )
        : list && Object.entries(list.Data).map (([coin]) => 
          list.Data[coin].PlatformType === "blockchain" ? 
          <CoinInfo
            image={list.Data[coin].ImageUrl}
            name={list.Data[coin].FullName}
            symbol={list.Data[coin].Symbol}
          />
      : null
      )}
      </ul>
    </div>
  );
}

export default App;