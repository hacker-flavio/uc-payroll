import React, { useEffect, useState } from "react";
import PayrollChart from "./components/PayrollChart";
import axios from "axios";

function App() {
  const [data, setData] = useState<{ rows: { cell: string[]; id: string }[] }>({
    rows: [],
  });
  // Use useState to manage nums and labels arrays
  const [nums, setNums] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/payrolls").then((res) => {
      // Replace single quotes with double quotes in the response text
      const responseText = res.data.replace(/'/g, '"');
      // Parse the JSON string to a JavaScript object
      const parsedData = JSON.parse(responseText);
      setData(parsedData);
    });
  }, []);

  useEffect(() => {
    if (data.rows.length > 0) {
      // Use functional updates to avoid directly mutating the state arrays
      setNums((prevNums) => {
        const newNums = data.rows.map((row) => parseInt(row.cell[6], 10)); // Parse to number
        return [...prevNums, ...newNums];
      });

      setLabels((prevLabels) => {
        const newLabels = data.rows.map((row) => row.cell[4]);
        return [...prevLabels, ...newLabels];
      });
    }
  }, [data]);

  return (
    <div className="App">
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h1>React App</h1>
      </div>

      <div>
        <PayrollChart nums={nums} labels={labels} />
      </div>

      <div style={{ width: "80%", margin: "0 auto" }}>
        <div>
          <button onClick={() => setShowTable(!showTable)}>Show Table</button>
        </div>
        <div>
          {data && showTable ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Year</th>
                  <th>Campus</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Title</th>
                  <th>Salary</th>
                  <th>Total Pay</th>
                  <th>Other Pay</th>
                  <th>Benefits</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.cell[0]}</td>
                    <td>{row.cell[1]}</td>
                    <td>{row.cell[2]}</td>
                    <td>{row.cell[3]}</td>
                    <td>{row.cell[4]}</td>
                    <td>{row.cell[5]}</td>
                    <td>{row.cell[6]}</td>
                    <td>{row.cell[7]}</td>
                    <td>{row.cell[8]}</td>
                    <td>{row.cell[9]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
