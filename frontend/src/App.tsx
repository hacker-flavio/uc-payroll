import React, { useEffect, useState } from "react";
import PayrollChart from "./components/PayrollChart";
import axios from "axios";

function App() {
  const [data, setData] = useState([
    {
      year: "2010",
      payroll: ["JORGE HERRERA GOMEZ", "9273.71"],
    },
    {
      year: "2011",
      payroll: ["JORGE HERRERA GOMEZ", "28313.93"],
    },
    {
      year: "2012",
      payroll: ["JORGE HERRERA GOMEZ", "43966.64"],
    },
    {
      year: "2013",
      payroll: ["JORGE HERRERA GOMEZ", "43092.00"],
    },
    {
      year: "2014",
      payroll: ["JORGE HERRERA GOMEZ", "44385.00"],
    },
    {
      year: "2015",
      payroll: ["JORGE HERRERA GOMEZ", "45716.00"],
    },
    {
      year: "2017",
      payroll: ["JORGE HERRERA GOMEZ", "50058.00"],
    },
    {
      year: "2018",
      payroll: ["JORGE HERRERA GOMEZ", "52051.00"],
    },
    {
      year: "2019",
      payroll: ["JORGE HERRERA GOMEZ", "55391.00"],
    },
    {
      year: "2020",
      payroll: ["JORGE HERRERA GOMEZ", "56352.00"],
    },
    {
      year: "2021",
      payroll: ["JORGE HERRERA GOMEZ", "57057.00"],
    },
    {
      year: "2022",
      payroll: ["JORGE HERRERA GOMEZ", "59134.00"],
    },
  ]);

  const [data2, setData2] = useState([
    {
      year: "2012",
      payroll: ["ROGELIO CHAVEZ", "12904.47"],
    },
    {
      year: "2013",
      payroll: ["ROGELIO CHAVEZ", "33241.00"],
    },
    {
      year: "2014",
      payroll: ["ROGELIO CHAVEZ", "35461.00"],
    },
    {
      year: "2015",
      payroll: ["ROGELIO CHAVEZ", "36611.00"],
    },
    {
      year: "2017",
      payroll: ["ROGELIO CHAVEZ", "40285.00"],
    },
    {
      year: "2018",
      payroll: ["ROGELIO CHAVEZ", "42532.00"],
    },
    {
      year: "2019",
      payroll: ["ROGELIO CHAVEZ", "48600.00"],
    },
    {
      year: "2020",
      payroll: ["ROGELIO CHAVEZ", "49440.00"],
    },
    {
      year: "2021",
      payroll: ["ROGELIO CHAVEZ", "50210.00"],
    },
    {
      year: "2022",
      payroll: ["ROGELIO CHAVEZ", "51883.00"],
    },
  ]);

  // const payrolls = data.map((item) => parseFloat(item.payroll[1]));
  // const payrolls2 = data2.map((item) => parseFloat(item.payroll[1]));

  // Extract payrolls/numbers and years/labels from the data
  const payrolls = data.map((object) => ({
    x: parseInt(object.year),
    y: parseFloat(object.payroll[1]),
  }));
  const payrolls2 = data2.map((object) => ({
    x: parseInt(object.year),
    y: parseFloat(object.payroll[1]),
  }));

  const years = data.map((item) => parseInt(item.year));

  return (
    <div className="App">
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h1>JORGE HERRERA GOMEZ vs ROGELIO CHAVEZ Salary</h1>
      </div>

      <div>
        <PayrollChart nums={payrolls} nums2={payrolls2} labels={years} />
      </div>
    </div>
  );
}

export default App;
