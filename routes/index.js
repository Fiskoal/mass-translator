const router = require("express").Router();
const massTranslator = require("../scripts/massTranslator.js");
const filter = require("../scripts/filter.js");

router.use("/api/filter", async (req, res) => {
  res.json("hello, this is api filter!")
});

router.use("/api/translate", async (req, res) => {
  
});

module.exports = router;