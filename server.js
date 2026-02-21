const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = "DAN_TOKEN_CUA_BAN_VAO_DAY";

async function sendMessage(userId, text) {
  try {
    await axios.post(
      "https://openapi.zalo.me/v3.0/oa/message/cs",
      {
        recipient: { user_id: userId },
        message: { text: text }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "access_token": BOT_TOKEN
        }
      }
    );
  } catch (err) {
    console.log("Lỗi gửi tin:", err.response?.data || err.message);
  }
}

app.post("/webhook", async (req, res) => {
  const event = req.body;

  if (event.message && event.sender) {
    const userId = event.sender.id;
    const text = event.message.text?.toLowerCase() || "";

    if (text.includes("mua")) {
      await sendMessage(
        userId,
        "GÓI LOCKET GOLD VĨNH VIỄN: 99.000đ\n\nChuyển khoản:\nMB Bank\nSTK: 123456789\nChủ TK: CHUM\n\nSau khi chuyển khoản vui lòng chụp bill gửi lại để xác nhận."
      );
    } 
    else if (text.includes("giá")) {
      await sendMessage(
        userId,
        "Giá Locket Gold vĩnh viễn: 99.000đ\nNhắn 'mua' để nhận thông tin thanh toán."
      );
    } 
    else {
      await sendMessage(
        userId,
        "Xin chào. Nhắn 'giá' để xem giá hoặc 'mua' để nhận thông tin thanh toán."
      );
    }
  }

  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Webhook server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server chạy ở cổng " + PORT);
});
