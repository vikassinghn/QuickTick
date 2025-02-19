const express = require("express");
const cors = require("cors");  // ✅ Import CORS
const app = express();
require("./conn/conn");

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1", auth);
app.use("/api/v1", list);

app.listen(1000, () => {
  console.log("Server Start on Port 1000");
});
