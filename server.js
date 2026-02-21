const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Data từ Zalo:", req.body);
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Server đang chạy");
});

app.listen(3000, () => {
  console.log("Server running");
});
