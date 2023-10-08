import React from "react";
import Loading from "./myLoading.png";

function MyLoadingScreen() {
  return (
    <div>
      <img src={Loading} alt="Loading" style={{ width: "350px" }} />
    </div>
  );
}

export default MyLoadingScreen;
