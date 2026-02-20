const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

// Tạo đơn
app.post("/create-order", (req, res) => {
  const { name, phone, product, price } = req.body;

  const newOrder = {
    id: Date.now().toString(),
    name,
    phone,
    product,
    price,
    status: "pending"
  };

  orders.push(newOrder);
  res.json({ success: true, id: newOrder.id });
});

// Lấy tất cả đơn
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Duyệt đơn
app.post("/approve/:id", (req, res) => {
  const id = req.params.id;

  const order = orders.find(o => o.id == id);
  if (!order) return res.json({ success: false });

  order.status = "approved";
  res.json({ success: true });
});

// Xoá đơn
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  orders = orders.filter(o => o.id != id);
  res.json({ success: true });
});

// Kiểm tra trạng thái cho khách
app.get("/status/:id", (req, res) => {
  const id = req.params.id;

  const order = orders.find(o => o.id == id);
  if (!order) return res.json({ success: false });

  res.json({ success: true, status: order.status });
});

app.listen(3000, () => console.log("Server running"));
