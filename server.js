const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = "chumchumcte193@gmail.com";
const ADMIN_PASSWORD = "19329";

app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Sai email hoặc mật khẩu" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
