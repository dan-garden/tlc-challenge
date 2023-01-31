import React, { useState, useEffect } from 'react';

interface DrawResult {
  PrimaryNumbers: number[];
  SecondaryNumbers: number[];
}

interface Data {
  DrawResults: DrawResult[];
}

const App: React.FC = () => {
  const [results, setResults] = useState<DrawResult[]>([]);
  const [powerballNumbers, setPowerballNumbers] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CompanyId: 'GoldenCasket',
          MaxDrawCountPerProduct: 1,
          OptionalProductFilter: ['Powerball']
        })
      });
      const data = await response.json() as Data;

      console.log(data);
      setResults(data.DrawResults);
    };

    fetchData();
  }, []);

  const handleAutoFill = () => {
    const lastResult = results[0];
    setPowerballNumbers(lastResult.PrimaryNumbers.concat(lastResult.SecondaryNumbers));
  };

  const handleClear = () => {
    setPowerballNumbers([]);
  };

  return (
    <div>
      <h1>The Lott - Powerball Ticket</h1>
      <div>
        <h2>Selected Numbers:</h2>
        {powerballNumbers.map(number => <div key={number}>{number}</div>)}
      </div>
      <div>
        <button onClick={handleAutoFill}>AutoFill</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default App;