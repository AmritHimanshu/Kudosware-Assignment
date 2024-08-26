const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./router/auth.js'));


app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
