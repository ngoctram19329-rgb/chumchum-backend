const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

// Test server
app.get("/", (req, res) => {
  res.send("Chum Chum Backend Running");
});

// Tạo đơn hàng
app.post("/create-order", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Missing info" });
  }

  const newOrder = {
    id: Date.now(),
    name,
    phone,
    product: "Locket Gold",
    status: "pending"
  };

  orders.push(newOrder);

  res.json({ message: "Order created", order: newOrder });
});

// Xem tất cả đơn (admin)
app.get("/admin/orders", (req, res) => {
  res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
