const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require("./db");
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './config.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: true,
    origin:'https://kudosware-assignment-seven.vercel.app',
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

    const Token = jwt.sign({ id: result.rows[0].id }, process.env.SECRET_KEY);
    res.cookie("jwtoken", Token);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  // try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    res.status(201).json(user);

  //   if (!user.rows[0]) {
  //     return res.status(401).json({ error: "Invalid credentials" });
  //   }
  //   if (user.rows[0].password !== password) {
  //     return res.status(401).json({ error: "Invalid credentials" });
  //   }

  //   const Token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY);
  //   res.cookie("jwtoken", Token);

  //   res.status(201).json({ message: "Successfully logged in" });
  // } catch (error) {
  //   console.error(err.message);
  //   res.status(500).json({ error: "Internal server error" });
  // }
});

app.post("/api/profile/edit", async (req, res) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      throw new Error("Token has expired");
    }

    const { id, name, email, password, confirm_password, resume_url } =
      req.body;
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const updatedUser = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (updatedUser) {
      return res.status(201).json({ message: "Successfully updated" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!verifyToken) {
      throw new Error("Token has expired");
    }

    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      verifyToken.id,
    ]);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(201).send(user.rows[0]);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/logout", (req, res) => {
  // res.cookie("jwtoken", "");
  res.clearCookie('jwtoken', { path: '/' });
  res.status(201).json({ message: "User Logout" });
});

app.get("/", (req, res) => {
  res.send("Hii this is backend from router");
});

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
