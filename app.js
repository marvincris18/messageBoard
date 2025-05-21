const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// In-memory messages store
const messages = [
  { text: "Hello, world!", user: "Alice", added: new Date() },
  { text: "Hi there!", user: "Bob", added: new Date() },
];

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const { user, text } = req.body;
  messages.push({ text, user, added: new Date() });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
