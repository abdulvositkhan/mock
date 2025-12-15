const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const testRoutes = require("./routes/testRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Atlas ulandi"))
  .catch(err => console.log("MongoDB xato:", err));

app.use("/api/tests", testRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Mock Test Server ishlayapti");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
