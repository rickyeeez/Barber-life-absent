const express = require("express");
require("esm-hook"); // <--- add this to the top of your file.

const fetch = require("node-fetch").default;

const router = express.Router();
const Model = require("../model/model");

router.post("/", async (req, res) => {
  try {
    const result = await Model.findOne({ uniq: req.body.uniq });

    if (!result) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
