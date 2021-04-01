const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const applicationRoute = require("./routes/application");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/application", applicationRoute)
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("Connection to database failed");
    } else {
      console.log("Database is successfully connected");
    }
  }
);

app.listen(5000, () => {
  console.log("Server is up and running on 5000");
});
