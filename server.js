const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const todos = require("./routes/todos_routes");
const mongoURI = require("./config/keys").mongoURI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to the DB"))
  .catch(err => console.log("Error Occured while connecting to DB", err));

app.use("/api/todo", todos);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
