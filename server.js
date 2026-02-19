app.use(express.json());
const ADMIN_EMAIL = "chumchumcte193@gmail.com";
const ADMIN_PASSWORD = "19329";

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
app.get("/admin", (req, res) => {
  let html = "<h2>Danh sách đơn</h2>";

  orders.forEach(o => {
    html += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px">
        ID: ${o.id} <br>
        Username: ${o.username} <br>
        Status: ${o.status} <br>
        <form method="POST" action="/approve/${o.id}">
          <button>Duyệt</button>
        </form>
      </div>
    `;
  });

  res.send(html);
});

app.post("/approve/:id", (req, res) => {
  const id = req.params.id;
  const order = orders.find(o => o.id == id);
  if (order) order.status = "done";
  res.redirect("/admin");
});
app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
