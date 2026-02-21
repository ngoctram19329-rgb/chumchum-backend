const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Nhận từ Zalo:", req.body);
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Webhook server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server chạy ở cổng " + PORT);
});
