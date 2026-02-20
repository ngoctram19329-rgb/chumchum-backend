const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = "chumchumcte193@gmail.com";
const ADMIN_PASSWORD = "19329";

let orders = [];

// Tạo đơn
app.post("/create-order", (req, res) => {
  const { name } = req.body;

  const newOrder = {
    id: Date.now(),
    name,
    status: "pending"
  };

  orders.push(newOrder);

  res.json({ success: true, id: newOrder.id });
});

// Lấy tất cả đơn (admin)
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Duyệt đơn
app.post("/approve-order/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) return res.json({ success: false });

  order.status = "approved";
  res.json({ success: true });
});

// Kiểm tra trạng thái đơn (khách)
app.get("/order-status/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) return res.json({ success: false });

  res.json({ success: true, status: order.status });
});

// Đăng nhập admin
app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
