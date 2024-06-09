import { Component } from 'react';
import Plot from 'react-plotly.js';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      inputValue: '',
      stockSymbol: 'AMZN'
    };
  }
    
  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const API_KEY2 = import.meta.env.VITE_APP_API_KEY2;
    const StockSymbol = this.state.stockSymbol;
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&apikey=${API_KEY2}`;
    
    fetch(API_Call)
      .then(response => response.json())
      .then(data => {
        const timeSeries = data['Time Series (5min)'];
        if (!timeSeries) return;

        const stockChartXValuesFunction = [];
        const stockChartYValuesFunction = [];

        for (let key in timeSeries) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(timeSeries[key]['1. open']);
        }

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <h1>Stock Market</h1>
        <div className="stockInput">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
        <button onClick={() => this.setState({ stockSymbol: this.state.inputValue })}>
          Search
        </button>
        </div>
        
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
         
          layout={{width: 720, height: 440, title: `A StockPlot of {StockSymbol}`}}

        />
        </div>
       
    
    )
  }
}

export default Stock;