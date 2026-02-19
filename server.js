const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chum Chum Backend is running");
});

// Tạo đơn hàng (khách gửi yêu cầu mua)
app.post("/create-order", (req, res) => {
  const { username, product } = req.body;

  if (!username || !product) {
    return res.status(400).json({ message: "Thiếu thông tin" });
  }

  // Tạm thời chỉ giả lập đơn hàng
  const order = {
    id: Date.now(),
    username,
    product,
    status: "PENDING" // Chờ bạn kiểm tra tiền
  };

  res.json({
    message: "Đơn hàng đã tạo, chờ xác nhận thanh toán",
    order
  });
});

// Xác nhận thanh toán (bạn kiểm tra tiền xong mới gọi API này)
app.post("/confirm-payment", (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: "Thiếu orderId" });
  }

  res.json({
    message: "Thanh toán thành công",
    orderId,
    status: "SUCCESS"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
