const router = require("express").Router();
const JsonData = require("../models/DataSchema");

router.get("/", async (req, res) => {
  try {
    const data = await JsonData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
