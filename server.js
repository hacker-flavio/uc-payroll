const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const dburl = process.env.DBURL;

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mdb = mongoose.connection;
mdb.on("error", (error) => console.error(error));
mdb.once("open", () => console.log("Connected to Mongoose"));

const port = process.env.PORT || 4050;
app.use(express.json());

const axios = require("axios");
const FormData = require("form-data");

//added comment
// Serve static files from the "build" directory
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

// Handle requests for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

app.get("/indexEmployeeMongo", async (req, res) => {
  const { schoolName, employeeName } = req.query;
  // const schoolNameToFind = "Merced";
  // const employeeNameToFind = "ROGELIO CHAVEZ";
  const schoolNameToFind = schoolName;
  const employeeNameToFind = employeeName.toUpperCase();

  try {
    const collection = mongoose.connection.db.collection("dataFile"); // Replace with your collection name

    const school = await collection.findOne({ name: schoolNameToFind });

    if (school) {
      const employee = school.employees.find(
        (employee) => employee.name === employeeNameToFind
      );

      if (employee) {
        const payrolls = employee.payrolls;
        console.log(
          "Payrolls for",
          employeeNameToFind,
          "at",
          schoolNameToFind,
          ":",
          payrolls
        );
        res.send(payrolls);
      } else {
        console.log("Employee not found in", schoolNameToFind);
        res.status(404).send("Employee not found");
      }
    } else {
      console.log("School not found:", schoolNameToFind);
      res.status(404).send("School not found");
    }
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/testing", async (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
