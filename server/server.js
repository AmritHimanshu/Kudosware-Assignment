const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.post("/api/signup", async (req, res) => {
  const { name, email, password, confirm_password, resume_url } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password, confirm_password, resume_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, confirm_password, resume_url]
    );
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
