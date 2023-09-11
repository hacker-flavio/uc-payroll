import React, { useState } from "react";
import PayrollChart from "./components/PayrollChart";
import axios from "axios";
interface ResponseData {
  data: {
    year: string;
    salary: string;
  }[];
}

function App() {
  const [employeeName, setEmployeeName] = useState("JAY SHARPING");

  const [data, setData] = useState<{ year: string; salary: string }[] | null>(
    null
  );

  const searchEmployee = () => {
    console.log("Searching for " + employeeName);

    axios
      .get("http://localhost:4050/indexEmployeeMongo", {
        params: {
          schoolName: "Merced",
          employeeName: employeeName,
        },
      })
      .then((response: ResponseData) => {
        console.log(JSON.stringify(response.data));
        setData(response.data); // Assuming the response is an array
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const payrolls =
    data?.map((object) => ({
      x: parseInt(object.year),
      y: parseFloat(object.salary),
    })) ?? [];

  const years = data?.map((item) => parseInt(item.year)) ?? [];

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={employeeName}
          onChange={(event) => {
            setEmployeeName(event.target.value);
          }}
        />
        <button onClick={() => searchEmployee()}>Search</button>
      </div>

      <div style={{ width: "80%", margin: "0 auto" }}>
        <h1>JAY SHARPING Salary</h1>
      </div>

      <div>
        <PayrollChart nums={payrolls} labels={years} />
        <div></div>
      </div>
    </div>
  );
}

export default App;
