const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");


const userRoute = require("./routes/user");
const applicationRoute = require("./routes/application");
const applicationController = require("./controllers/application-controller");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/application", applicationRoute);
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

const httpServer = createServer(app);
applicationController.init(httpServer);


httpServer.listen(5000);
