import React, { useState, useRef, useEffect } from "react";
import PayrollChart from "./components/PayrollChart";
import SearchEmployee from "./components/SearchEmployee";
import MyLoadingScreen from "./components/MyLoadingScreen";
import EmptyPage from "./components/EmptyPage";
import axios from "axios";
interface ResponseData {
  data: {
    year: string;
    salary: string;
  }[];
}

function App() {
  const [employeeName, setEmployeeName] = useState("");
  const [isSearching, setIsSearching] = useState({ state: "null" }); // [1
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
        // setIsSearching(false);
        setIsSearching({ state: "success" }); // [2
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

  useEffect(() => {
    if (employeeName !== "") {
      setIsSearching({ state: "loading" });

      searchEmployee();
    }
  }, [employeeName]);

  return (
    <div className="App">
      <div style={{ width: "80%", margin: "0 auto", paddingTop: "35px" }}>
        <SearchEmployee setEmployeeName={setEmployeeName} />

        <div>
          {isSearching?.state === "success" ? (
            <PayrollChart nums={payrolls} labels={years} name={employeeName} />
          ) : isSearching?.state === "loading" ? (
            <MyLoadingScreen />
          ) : (
            <EmptyPage />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
