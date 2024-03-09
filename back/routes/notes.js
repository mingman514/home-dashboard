const express = require("express");
const router = express.Router();

const fs = require("fs");

const DB_PATH = "./notes_db.json";

// /users 경로에 대한 GET 요청 핸들러
router.get("/", (req, res) => {
  const jsonFile = fs.readFileSync(DB_PATH, "utf8");
  const jsonData = JSON.parse(jsonFile);

  if (jsonData) res.json({ result: jsonData, status: 0 });
  else res.json({ result: null, status: 1 });
});

router.post("/", (req, res) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(req.body));
    return res.json({ status: 0 });
  } catch (error) {
    console.error(err);
    return res.json({ status: 1 });
  }
});

module.exports = router;
