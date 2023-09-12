import React, { useState } from "react";
import PayrollChart from "./components/PayrollChart";
import SearchEmployee from "./components/SearchEmployee";
import MyLoadingScreen from "./components/MyLoadingScreen";
import Error from "./components/Error";
import EmptyPage from "./components/EmptyPage";

import axios from "axios";
interface ResponseData {
  data: {
    year: string;
    salary: string;
  }[];
}

function App() {
  //check for url
  var currentUrl = window.location.href;
  var partStr = currentUrl.slice(0, 5);
  var uri = "";
  if (partStr === "https") {
    uri = "https://www.ucpayrolls.com";
  } else {
    uri = "http://localhost:4050";
  }
  console.log(uri);
  const [employeeName, setEmployeeName] = useState("");
  const [isSearching, setIsSearching] = useState({ state: "null" }); // [1
  const [data, setData] = useState<{ year: string; salary: string }[] | null>(
    null
  );

  const searchEmployee = (name: string) => {
    console.log("Searching for " + name);
    setIsSearching({ state: "loading" });

    axios
      .get(`${uri}/indexEmployeeMongo`, {
        params: {
          schoolName: "Merced",
          employeeName: name,
        },
      })
      .then((response: ResponseData) => {
        console.log(JSON.stringify(response.data));
        setData(response.data); // Assuming the response is an array
        // setIsSearching(false);
        setEmployeeName(name);
        setIsSearching({ state: "success" }); // [2
      })
      .catch((error: any) => {
        console.log(error);
        setIsSearching({ state: "error" });
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
      <div style={{ width: "80%", margin: "0 auto", paddingTop: "35px" }}>
        <SearchEmployee searchEmployee={searchEmployee} />

        <div>
          {isSearching?.state === "success" ? (
            <PayrollChart nums={payrolls} labels={years} name={employeeName} />
          ) : isSearching?.state === "loading" ? (
            <MyLoadingScreen />
          ) : isSearching?.state === "error" ? (
            <Error />
          ) : (
            <EmptyPage />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
