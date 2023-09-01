const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

const port = process.env.PORT || 4050;
app.use(express.json());

const axios = require("axios");
const FormData = require("form-data");

// Serve static files from the "build" directory
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

// Handle requests for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});
app.get("/payrolls", (req, res) => {
  let data = new FormData();
  data.append("_search", "false");
  data.append("nd", "1693609828178");
  data.append("rows", "20");
  data.append("page", "1");
  data.append("sidx", "EAW_GRS_EARN_AMT");
  data.append("sord", "desc");
  data.append("year", "2022");
  data.append("location", "Merced");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ucannualwage.ucop.edu/wage/search.action",
    headers: {
      Cookie: "JSESSIONID=0000H5l-s83LwUsRWFvQTLAqqMj:168lpmkau",
      ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "error" });
    });
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
