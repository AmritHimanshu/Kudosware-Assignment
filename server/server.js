const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.post("/api/signup", async (req, res) => {
  const { name, email, password, confirm_password, resume_url } = req.body;
  try {
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const result = await db.query(
      "INSERT INTO users (name, email, password, confirm_password, resume_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, confirm_password, resume_url]
    );

    const Token = jwt.sign({ email }, process.env.SECRET_KEY);
    console.log(Token);
    res.cookie("jwtoken", Token);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hii this is backend from router");
});

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
