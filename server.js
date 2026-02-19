dconst express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

app.post("/create-order", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }

  const newOrder = {
    id: Date.now(),
    username,
    status: "pending",
    createdAt: new Date()
  };

  orders.push(newOrder);

  res.json(newOrder);
});

app.get("/admin/orders", (req, res) => {
  res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/approve", (req, res) => {
  const { id } = req.body;
  const order = orders.find(o => o.id == id);
  if (order) {
    order.status = "done";
  }
  res.json({ message: "Đã duyệt" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
