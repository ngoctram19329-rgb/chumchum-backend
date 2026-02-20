const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

/* =========================
   TẠO ĐƠN
========================= */
app.post("/create-order", (req, res) => {
  const { name, phone, product, price } = req.body;

  if (!name || !phone || !product || !price) {
    return res.json({ success: false, message: "Thiếu dữ liệu" });
  }

  const newOrder = {
    id: Date.now().toString(),
    name,
    phone,
    product,
    price,
    status: "pending"
  };

  orders.push(newOrder);

  res.json({
    success: true,
    id: newOrder.id
  });
});

/* =========================
   LẤY DANH SÁCH ĐƠN
========================= */
app.get("/orders", (req, res) => {
  res.json(orders);
});

/* =========================
   DUYỆT ĐƠN
========================= */
app.post("/approve/:id", (req, res) => {
  const id = req.params.id;

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.json({ success: false });
  }

  order.status = "approved";
  res.json({ success: true });
});

/* =========================
   XOÁ ĐƠN
========================= */
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  orders = orders.filter(o => o.id !== id);
  res.json({ success: true });
});

/* =========================
   KHÁCH KIỂM TRA TRẠNG THÁI
========================= */
app.get("/status/:id", (req, res) => {
  const id = req.params.id;

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.json({ success: false });
  }

  res.json({
    success: true,
    status: order.status
  });
});

/* ========================= */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
