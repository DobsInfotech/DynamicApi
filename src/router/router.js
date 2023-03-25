const express = require("express");
const router = express.Router();
const { class1 } = require("../controller/controller");

router.get("/", class1.a);
router.get("/Show", class1.b);
router.get("/:id", class1.c);
router.post("/:id", class1.d);
router.get("/:id/data", class1.e);

module.exports = router;
