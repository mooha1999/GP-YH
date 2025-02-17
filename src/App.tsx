import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 1- Ask the user to enter the number of devices
  // 2- For each device, ask the user to enter 5 prices for this device
  // 3- Display a Generate button to generate a table
  // 4- Generate 100 random numbers from 0 to 1
  // 5- The table will have 100 rows and n + 2 columns
  // 6- The first column will be the index of the row
  // 7- The next n columns will be calculated using the following equation:
  //    minPrice = calculate the minimum price of this device
  //    maxPrice = calculate the maximum price of this device
  //    price = minPrice + Math.random() * (maxPrice - minPrice)
  // 8- The last column will be the sum of the n columns
  // 9- Display the table in ascending order of the sum of the n columns

  const [devices, setDevices] = useState<number>(0);
  const [prices, setPrices] = useState<{ name: string; values: number[] }[]>(
    []
  );
  const [table, setTable] = useState<number[][]>([]);
  const [statistics, setStatistics] = useState<number[]>([]);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0);

  useEffect(() => {
    if (devices > 0) {
      setPrices(
        new Array(devices)
          .fill(0)
          .map(() => ({ name: "", values: new Array(5).fill(0) }))
      );
    }
  }, [devices]);

  const handleGenerate = () => {
    if (devices === 0) {
      return;
    }
    const newTable = new Array(100).fill(0).map((_, index) => {
      const row = new Array<number>(devices + 2).fill(0);
      const sum = prices.reduce((acc, device, i) => {
        const minPrice = Math.min(...device.values);
        const maxPrice = Math.max(...device.values);
        const price = minPrice + Math.random() * (maxPrice - minPrice);
        row[i + 1] = price;
        return acc + price;
      }, 0);
      row[0] = index + 1;
      row[devices + 1] = sum;
      return row;
    });
    const newTableSorted = newTable.sort(
      (a, b) => a[devices + 1] - b[devices + 1]
    );
    setTable(newTableSorted);

    // the minimum of the totals column
    const min = Math.min(...newTableSorted.map((row) => row[devices + 1]));
    // the maximum of the totals column
    const max = Math.max(...newTableSorted.map((row) => row[devices + 1]));
    // the mean of the totals column
    const mean =
      newTableSorted.reduce((acc, row) => acc + row[devices + 1], 0) / 100;
    // the confidence level of the totals column -> element 95 plus element 96 divided by 2
    const confidenceLevelVal =
      (newTableSorted[confidenceLevel][devices + 1] +
        newTableSorted[confidenceLevel + 1][devices + 1]) /
      2;
    console.log(
      newTableSorted[confidenceLevel][devices + 1],
      newTableSorted[confidenceLevel + 1][devices + 1]
    );
    setStatistics([min, max, mean, confidenceLevelVal]);
  };

  const onConfidenceLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < 100) {
      setConfidenceLevel(value);
    } else if (value < 0) {
      setConfidenceLevel(0);
    } else {
      setConfidenceLevel(99);
    }
  };

  return (
    <div className="App">
      <h1>Purchase Budget Estimation</h1>
      <div>
        <label>Enter the number of devices:</label>
        <input
          type="number"
          value={devices}
          onChange={(e) => setDevices(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Enter the confidence level percentage:</label>
        <input
          type="number"
          value={confidenceLevel}
          onChange={onConfidenceLevelChange}
        />
      </div>
      {prices.length > 0 && (
        <div>
          {prices.map((device, i) => (
            <div key={i}>
              <label>Enter the name and 5 prices for device {i + 1}:</label>
              <input
                type="text"
                value={device.name}
                onChange={(e) => {
                  const newPrices = [...prices];
                  newPrices[i].name = e.target.value;
                  setPrices(newPrices);
                }}
                placeholder="Device Name"
              />
              {device.values.map((price, j) => (
                <input
                  key={j}
                  type="number"
                  value={price}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[i].values[j] = parseInt(e.target.value);
                    setPrices(newPrices);
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      <button onClick={handleGenerate} disabled={devices === 0}>
        Generate
      </button>
      {table.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Index</th>
                {prices.map((device, i) => (
                  <th key={i}>{device.name || `Device ${i + 1}`}</th>
                ))}
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    if (j === 0) {
                      return <td key={j}>{i + 1}</td>;
                    } else {
                      return <td key={j}>{cell.toFixed(2)}</td>;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Another table to display the statistics */}
          <table>
            <thead>
              <tr>
                <th>Statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minimum: {statistics[0].toFixed(2)}</td>
              </tr>
              <tr>
                <td>Maximum: {statistics[1].toFixed(2)}</td>
              </tr>
              <tr>
                <td>Mean: {statistics[2].toFixed(2)}</td>
              </tr>
              <tr>
                <td>Confidence Level: {statistics[3].toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
