const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hii this is backend from router");
});


app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
