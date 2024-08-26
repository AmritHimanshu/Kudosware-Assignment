const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Hii this is backend from router");
});

module.exports = router;