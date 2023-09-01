import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

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
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <h1>React App</h1>
      {data && (
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
      )}
    </div>
  );
}

export default App;
