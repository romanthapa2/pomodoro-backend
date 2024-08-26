const express = require("express");
const apiError = require("../utils/apiError.utils");
const task = require("../controllers/task.controller")

const router = express.Router();


router.post("/tasks",task);

module.exports = router;