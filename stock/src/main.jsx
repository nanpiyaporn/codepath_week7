import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from '../routes/Layout.jsx';
import NotFound from '../routes/NotFound.jsx';

import DetailView from '../routes/DetailView';
import StockDetailView from '../routes/StockDetailView';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Layout />}>
          <Route index={true} path="/" element={<App />} />
          <Route index={false} path="/stockDetails/:symbol" element={<StockDetailView />} />
          <Route index={false} path="/coinDetails/:symbol" element={<DetailView />} />
        
          <Route index={false} path="*" element={<NotFound />} />
  
          </Route>  
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
